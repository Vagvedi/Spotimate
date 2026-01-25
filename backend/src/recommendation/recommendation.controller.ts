import {
  Controller,
  Get,
  Query,
  UseGuards,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { Request } from 'express';
import { RecommendationService } from './recommendation.service';
import { WeatherService } from '../weather/weather.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../auth/entities/user.entity';

@Controller('api/recommendations')
export class RecommendationController {
  constructor(
    private recommendationService: RecommendationService,
    private weatherService: WeatherService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getRecommendations(@Query('city') city: string, @Req() req: Request) {
    if (!city) {
      throw new BadRequestException('City parameter is required');
    }

    const user = req.user as User;
    const weather = await this.weatherService.getWeather(city, user);
    return this.recommendationService.getRecommendations(weather, user);
  }
}
