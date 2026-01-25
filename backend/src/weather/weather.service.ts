import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { firstValueFrom } from 'rxjs';
import { WeatherResponseDto } from './dto/weather-response.dto';
import { SearchHistory } from '../history/entities/search-history.entity';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class WeatherService {
  private baseUrl = process.env.OPEN_WEATHER_BASE_URL;
  private apiKey = process.env.OPEN_WEATHER_API_KEY;

  constructor(
    private httpService: HttpService,
    @InjectRepository(SearchHistory)
    private searchHistoryRepository: Repository<SearchHistory>,
  ) {}

  async getWeather(
    city: string,
    user?: User,
  ): Promise<WeatherResponseDto> {
    if (!this.apiKey) {
      throw new Error('OpenWeather API key not configured');
    }

    try {
      const url = `${this.baseUrl}/weather?q=${city}&appid=${this.apiKey}&units=metric`;
      const response = await firstValueFrom(this.httpService.get(url));
      const data = response.data;

      const weatherResponse: WeatherResponseDto = {
        city: data.name,
        country: data.sys.country,
        condition: data.weather[0].main,
        description: data.weather[0].description,
        temperature: data.main.temp,
        feelsLike: data.main.feels_like,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        icon: data.weather[0].icon,
      };

      // Save to search history if user is provided
      if (user) {
        const searchHistory = this.searchHistoryRepository.create({
          user,
          city: weatherResponse.city,
          countryCode: weatherResponse.country,
        });
        await this.searchHistoryRepository.save(searchHistory);
      }

      return weatherResponse;
    } catch (error) {
      throw new Error(`Failed to fetch weather: ${error.message}`);
    }
  }
}
