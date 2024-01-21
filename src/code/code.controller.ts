import { Controller, Get, HttpCode, UseGuards } from '@nestjs/common';
import { CodeService } from 'src/code/code.service';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { BaseResponse } from 'src/shared/responses/base.response';

@Controller('code')
export class CodeController {
  constructor(private readonly codeService: CodeService) {}

  @Get('fortune-type')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  async getFortuneCode() {
    const codeList = await this.codeService.getCodeByCategory('FORTUNE_TYPE');
    if (codeList.length > 0) return BaseResponse.success(codeList);
    else return BaseResponse.emptyData([]);
  }
}
