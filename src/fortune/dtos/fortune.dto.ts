import { CodeFields } from '@prisma/client';
import { IsIn } from 'class-validator';
import { FORTUNE_TYPE_CODE_FIELDS } from 'src/shared/constants/data';

export class CreateTodayFortuneDto {
  @IsIn(FORTUNE_TYPE_CODE_FIELDS)
  readonly fortuneType: CodeFields;
}
