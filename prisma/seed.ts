import { CodeCategoryFields, CodeFields, PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const USER_INIT_DATA: { userId: string }[] = [
  { userId: 'test' },
  { userId: 'test2' },
];

const CODE_CATEGORY_INIT_DATA: { name: CodeCategoryFields }[] = [
  {
    name: 'FORTUNE_STATUS',
  },
  { name: 'FORTUNE_TYPE' },
];

const CODE_INIT_DATA: {
  categoryName: CodeCategoryFields;
  name: string;
  code: CodeFields;
}[] = [
  {
    categoryName: 'FORTUNE_STATUS',
    code: 'GOOD',
    name: '좋음',
  },
  {
    categoryName: 'FORTUNE_STATUS',
    code: 'AVERAGE',
    name: '보통',
  },
  {
    categoryName: 'FORTUNE_STATUS',
    code: 'BAD',
    name: '나쁨',
  },
  {
    categoryName: 'FORTUNE_TYPE',
    code: 'SUCCESS',
    name: '성공',
  },
  {
    categoryName: 'FORTUNE_TYPE',
    code: 'MONEY',
    name: '재물',
  },
  {
    categoryName: 'FORTUNE_TYPE',
    code: 'WINNING',
    name: '당첨',
  },
];

async function main() {
  await prisma.codeCategory.createMany({
    data: CODE_CATEGORY_INIT_DATA,
    skipDuplicates: true,
  });
  await prisma.code.createMany({
    data: CODE_INIT_DATA,
    skipDuplicates: true,
  });
  const [fortuneTypeCodeList, fortuneStatusCodeList] = await Promise.all([
    prisma.code.findMany({
      where: { categoryName: 'FORTUNE_TYPE' },
      select: { code: true },
    }),
    prisma.code.findMany({
      where: { categoryName: 'FORTUNE_STATUS' },
      select: { code: true },
    }),
  ]);
  const setFortuneContentData = ['운세 1', '운세 2', '운세 3'];
  await Promise.all(
    fortuneTypeCodeList.flatMap((fortuneTypeCode) =>
      fortuneStatusCodeList.map((fortuneStatusCode) =>
        prisma.fortune.createMany({
          data: setFortuneContentData.map((content) => ({
            content,
            fortuneStatus: fortuneStatusCode.code,
            fortuneType: fortuneTypeCode.code,
          })),
        }),
      ),
    ),
  );

  const saltRound = 10;
  const salt = await bcrypt.genSalt(saltRound);
  const hashedPassword = await bcrypt.hash('qwer1234', salt);

  await prisma.user.createMany({
    data: USER_INIT_DATA.map((userData) => ({
      userId: userData.userId,
      password: hashedPassword,
    })),
    skipDuplicates: true,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
