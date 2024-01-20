## Installation

```bash
$ yarn install
$ yarn
```

## Running the app

```bash
$ yarn start
```

## Database Setting

- 데이터베이스 : MySQL
- 환경 : 로컬

## Database Init

```bash
yarn prisma db push
yarn prisma db seed (초기 데이터 삽입)
```

## Database Model

### User(TD_FT_USER)

| Field     | Type     | Description                    |
| --------- | -------- | ------------------------------ |
| id        | Int      | 고유 식별자 (PK)               |
| userId    | String   | 사용자 ID (unique)             |
| password  | String   | 비밀번호                       |
| createdAt | DateTime | 생성 시간                      |
| updatedAt | DateTime | 수정 시간                      |
| fortunes  | -        | 다대다 구조를 위한 매핑 테이블 |

### Fortune(TD_FT_FORTUNE)

| Field         | Type              | Description                    |
| ------------- | ----------------- | ------------------------------ |
| id            | Int               | 고유 식별자 (PK)               |
| content       | String            | 운세 컨텐츠                    |
| fortuneType   | CodeFields (enum) | (FK) Code 테이블의 외래키      |
| fortuneStatus | CodeFields (enum) | (FK) Code 테이블의 외래키      |
| createdAt     | DateTime          | 생성 시간                      |
| updatedAt     | DateTime          | 수정 시간                      |
| users         | -                 | 다대다 구조를 위한 매핑 테이블 |

### UserFortuneMapping(TD_FT_USER_FORTUNE_MAPPING)

> 유저와 운세 사이의 다대다 관계를 나타내는 중간 매핑 테이블
>
> - 설계 전략 : 한 유저는 과거의 운세와 오늘의 운세에 해당하는 다수의 운세 보유 가능하고, 한 운세는 여러 유저에게 할당 가능
>
>   ```매핑 테이블은 하나의 유저가, 유저는 매핑 테이블을 여러 개 보유 가능 / 매핑 테이블은 하나의 운세가 할당, 운세는 매핑 테이블을 여러 개 보유 가능
>
>
>
>   즉 Many : one - one : Many 의 구조로 Many : Many 즉 다대다 구조 성립
>   ```
>
> ```
>
> ```

| Field     | Type     | Description                             |
| --------- | -------- | --------------------------------------- |
| id        | Int      | 고유 식별자                             |
| userId    | Int      | user 테이블과 매핑을 나타내는 외래키    |
| fortuneId | Int      | fortune 테이블과 매핑을 나타내는 외래키 |
| createdAt | DateTime | 생성 시간                               |
| updatedAt | DateTime | 수정 시간                               |

- index 설정: userId와 createdAt을 복합 인덱스로 설정하여, 사용자별 최신 운세 데이터 검색 시 검색 속도를 크게 향상
