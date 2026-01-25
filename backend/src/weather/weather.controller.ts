import {
  Controller,
  Get,
  Query,
  UseGuards,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { Request } from 'express';
import { WeatherService } from './weather.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../auth/entities/user.entity';

@Controller('api/weather')
export class WeatherController {
  constructor(private weatherService: WeatherService) {}

  @Get('search')
  @UseGuards(JwtAuthGuard)
  async getWeather(@Query('city') city: string, @Req() req: Request) {
    if (!city) {
      throw new BadRequestException('City parameter is required');
    }

    const user = req.user as User || null;
    return this.weatherService.getWeather(city, user);
  }
}
