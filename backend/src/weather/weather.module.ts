import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';
import { SearchHistory } from '../history/entities/search-history.entity';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([SearchHistory])],
  providers: [WeatherService],
  controllers: [WeatherController],
})
export class WeatherModule {}
