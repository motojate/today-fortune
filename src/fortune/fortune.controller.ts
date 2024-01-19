import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { FortuneService } from './fortune.service';

@Controller('fortune')
export class FortuneController {
  constructor(private readonly fortuneService: FortuneService) {}

  @Get()
  async getTodayFortune() {
    return this.fortuneService.checkTodayFortuneAvailability();
  }

  @Post('create')
  @UseGuards()
  async createTodayFortune(@Req() req: ExpressRequest & { id: number }) {
    return this.fortuneService.createTodayFortune({
      fortuneType: 'AVERAGE',
      userId: req.id,
    });
  }
}
