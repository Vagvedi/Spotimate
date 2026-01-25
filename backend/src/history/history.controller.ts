import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';
import { HistoryService } from './history.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../auth/entities/user.entity';

@Controller('api/history')
export class HistoryController {
  constructor(private historyService: HistoryService) {}

  @Get('search')
  @UseGuards(JwtAuthGuard)
  async getSearchHistory(@Req() req: Request) {
    const user = req.user as User;
    return this.historyService.getSearchHistory(user);
  }

  @Get('recommendations')
  @UseGuards(JwtAuthGuard)
  async getRecommendationHistory(@Req() req: Request) {
    const user = req.user as User;
    return this.historyService.getRecommendationHistory(user);
  }
}
