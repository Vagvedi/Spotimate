import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import { SearchHistory } from './entities/search-history.entity';
import { RecommendationHistory } from './entities/recommendation-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SearchHistory, RecommendationHistory])],
  providers: [HistoryService],
  controllers: [HistoryController],
})
export class HistoryModule {}
