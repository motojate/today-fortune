import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { FortuneService } from 'src/fortune/fortune.service';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { PayloadInterface } from 'src/shared/types/common';
import { CreateTodayFortuneDto } from 'src/fortune/dtos/fortune.dto';
import { BaseResponse } from 'src/shared/responses/base.response';

@Controller('fortune')
export class FortuneController {
  constructor(private readonly fortuneService: FortuneService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getTodayFortune(
    @Req() req: ExpressRequest & { user: PayloadInterface },
  ) {
    const fortune = await this.fortuneService.checkTodayFortuneAvailability(
      req.user.id,
    );
    if (fortune) return BaseResponse.success(fortune);
    else return BaseResponse.emptyData(null);
  }

  @Post('create')
  @UseGuards(JwtAuthGuard)
  async createTodayFortune(
    @Req() req: ExpressRequest & { user: PayloadInterface },
    @Body() createTodyFortuneDto: CreateTodayFortuneDto,
  ) {
    const fortune = await this.fortuneService.createTodayFortune({
      fortuneType: createTodyFortuneDto.fortuneType,
      userId: req.user.id,
    });
    return BaseResponse.success(fortune);
  }
}
