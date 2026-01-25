import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecommendationService } from './recommendation.service';
import { RecommendationController } from './recommendation.controller';
import { RecommendationHistory } from '../history/entities/recommendation-history.entity';
import { WeatherService } from '../weather/weather.service';
import { SearchHistory } from '../history/entities/search-history.entity';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([RecommendationHistory, SearchHistory]),
  ],
  providers: [RecommendationService, WeatherService],
  controllers: [RecommendationController],
})
export class RecommendationModule {}
