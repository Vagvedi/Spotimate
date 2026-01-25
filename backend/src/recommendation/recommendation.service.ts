import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { firstValueFrom } from 'rxjs';
import {
  MusicRecommendationResponseDto,
  Track,
} from './dto/music-recommendation-response.dto';
import { WeatherResponseDto } from '../weather/dto/weather-response.dto';
import { RecommendationHistory } from '../history/entities/recommendation-history.entity';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class RecommendationService {
  private clientId = process.env.SPOTIFY_API_CLIENT_ID;
  private clientSecret = process.env.SPOTIFY_API_CLIENT_SECRET;
  private tokenUrl = process.env.SPOTIFY_API_TOKEN_URL;
  private baseUrl = process.env.SPOTIFY_API_BASE_URL;
  private accessToken: string;
  private tokenExpiry: Date;

  private weatherGenreMap = {
    Clear: 'pop',
    Clouds: 'ambient',
    Rain: 'blues',
    Snow: 'indie',
    Thunderstorm: 'metal',
    Drizzle: 'folk',
    Mist: 'chill-out',
    Smoke: 'electronic',
    Haze: 'reggae',
    Dust: 'rock',
    Fog: 'classical',
    Sand: 'world',
    Ash: 'experimental',
    Squall: 'punk',
    Tornado: 'metal',
  };

  constructor(
    private httpService: HttpService,
    @InjectRepository(RecommendationHistory)
    private recommendationHistoryRepository: Repository<RecommendationHistory>,
  ) {}

  private async getAccessToken(): Promise<string> {
    if (
      this.accessToken &&
      this.tokenExpiry &&
      new Date() < this.tokenExpiry
    ) {
      return this.accessToken;
    }

    if (!this.clientId || !this.clientSecret) {
      throw new Error('Spotify API credentials not configured');
    }

    const credentials = Buffer.from(
      `${this.clientId}:${this.clientSecret}`,
    ).toString('base64');

    try {
      const response = await firstValueFrom(
        this.httpService.post(
          this.tokenUrl,
          'grant_type=client_credentials',
          {
            headers: {
              Authorization: `Basic ${credentials}`,
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          },
        ),
      );

      this.accessToken = response.data.access_token;
      this.tokenExpiry = new Date(Date.now() + response.data.expires_in * 1000);
      return this.accessToken;
    } catch (error) {
      throw new Error(`Failed to get Spotify token: ${error.message}`);
    }
  }

  private getGenreForWeather(weather: string): string {
    return this.weatherGenreMap[weather] || 'pop';
  }

  async getRecommendations(
    weather: WeatherResponseDto,
    user: User,
  ): Promise<MusicRecommendationResponseDto> {
    const token = await this.getAccessToken();
    const genre = this.getGenreForWeather(weather.condition);

    try {
      const url = `${this.baseUrl}/search?q=genre:${genre}&type=track&limit=20`;
      const response = await firstValueFrom(
        this.httpService.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      );

      const tracks: Track[] = response.data.tracks.items.map((item) => ({
        id: item.id,
        name: item.name,
        artist: item.artists?.[0]?.name || 'Unknown',
        album: item.album?.name || 'Unknown',
        previewUrl: item.preview_url || '',
        externalUrl: item.external_urls?.spotify || '',
        imageUrl: item.album?.images?.[0]?.url || '',
      }));

      const recommendation: MusicRecommendationResponseDto = {
        genre,
        weatherCondition: weather.condition,
        tracks,
      };

      // Save to recommendation history
      const history = this.recommendationHistoryRepository.create({
        user,
        city: weather.city,
        weatherCondition: weather.condition,
        temperature: weather.temperature,
        musicGenre: genre,
      });
      await this.recommendationHistoryRepository.save(history);

      return recommendation;
    } catch (error) {
      throw new Error(`Failed to get recommendations: ${error.message}`);
    }
  }
}
