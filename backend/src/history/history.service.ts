import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SearchHistory } from './entities/search-history.entity';
import { RecommendationHistory } from './entities/recommendation-history.entity';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(SearchHistory)
    private searchHistoryRepository: Repository<SearchHistory>,
    @InjectRepository(RecommendationHistory)
    private recommendationHistoryRepository: Repository<RecommendationHistory>,
  ) {}

  async getSearchHistory(user: User) {
    return this.searchHistoryRepository.find({
      where: { user: { id: user.id } },
      order: { searchedAt: 'DESC' },
    });
  }

  async getRecommendationHistory(user: User) {
    return this.recommendationHistoryRepository.find({
      where: { user: { id: user.id } },
      order: { recommendedAt: 'DESC' },
    });
  }
}
