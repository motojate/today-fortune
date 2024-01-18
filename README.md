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

### User(TD_FT_USER)

| Field     | Type     | Description                    |
| --------- | -------- | ------------------------------ |
| id        | Int      | 고유 식별자                    |
| userId    | String   | 사용자 ID (unique)             |
| password  | String   | 비밀번호                       |
| createdAt | DateTime | 생성 시간                      |
| updatedAt | DateTime | 수정 시간                      |
| fortunes  | -        | 다대다 구조를 위한 매핑 테이블 |

### Fortune 테이블

| Field         | Type          | Description                    |
| ------------- | ------------- | ------------------------------ |
| id            | Int           | 고유 식별자                    |
| content       | String        | 운세 컨텐츠                    |
| fortuneType   | FortuneType   | SUCCESS, WINNING, MONEY        |
| fortuneStatus | FortuneStatus | GOOD, AVERAGE, BAD             |
| createdAt     | DateTime      | 생성 시간                      |
| updatedAt     | DateTime      | 수정 시간                      |
| users         | -             | 다대다 구조를 위한 매핑 테이블 |

### UserFortuneMapping 테이블

- 유저와 운세 사이의 다대다 관계를 나타내는 중간 매핑 테이블
- 설계 전략 : 한 유저는 이전 운세와 오늘의 운세에 해당하는 다수의 운세 보유 가능하고, 한 운세는 여러 유저에게 할당 가능

| Field     | Type     | Description                             |
| --------- | -------- | --------------------------------------- |
| id        | Int      | 고유 식별자                             |
| userId    | Int      | user 테이블과 매핑을 나타내는 외래키    |
| fortuneId | Int      | fortune 테이블과 매핑을 나타내는 외래키 |
| createdAt | DateTime | 생성 시간                               |
| updatedAt | DateTime | 수정 시간                               |

- index 설정: userId와 createdAt을 복합 인덱스로 설정하여, 사용자별 최신 운세 데이터 검색 시 검색 속도를 크게 향상
