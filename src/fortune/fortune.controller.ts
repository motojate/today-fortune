import { Controller, Get } from '@nestjs/common';
import { FortuneService } from './fortune.service';

@Controller('fortune')
export class FortuneController {
  constructor(private readonly fortuneService: FortuneService) {}

  @Get()
  async getTodayFortune() {
    return this.fortuneService.checkTodayFortuneAvailability();
  }
}
