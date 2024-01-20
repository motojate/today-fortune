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
$ yarn prisma db push
$ yarn prisma db seed (초기 데이터 삽입)
```

## Database Model

### User(TD_FT_USER)

> 유저 테이블
>
> - 설계 전략 : 오늘의 운세를 볼 수 있는 유저 테이블

| Field     | Type     | Description                    |
| --------- | -------- | ------------------------------ |
| id        | Int      | 고유 식별자 (PK)               |
| userId    | String   | 사용자 ID (unique)             |
| password  | String   | 비밀번호                       |
| createdAt | DateTime | 생성 시간                      |
| updatedAt | DateTime | 수정 시간                      |
| fortunes  | -        | 다대다 구조를 위한 매핑 테이블 |

### Fortune(TD_FT_FORTUNE)

> 행운 테이블
>
> - 설계 전략 : 오늘의 운세에 대한 정보가 담겨있는 테이블
>
> ```
> fortuneType, fortuneStatus는 추후 확장 가능성이 좋게 Code 테이블과 1:N 관계로 설계
> ```

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
> ```
> 매핑 테이블은 하나의 유저가, 유저는 매핑 테이블을 여러 개 보유 가능
> 매핑 테이블은 하나의 운세가 할당, 운세는 매핑 테이블을 여러 개 보유 가능
> 즉 N : 1 - 1 : M 의 구조로 N : M 즉 다대다 구조 성립
> ```

| Field     | Type     | Description                             |
| --------- | -------- | --------------------------------------- |
| id        | Int      | 고유 식별자                             |
| userId    | Int      | user 테이블과 매핑을 나타내는 외래키    |
| fortuneId | Int      | fortune 테이블과 매핑을 나타내는 외래키 |
| createdAt | DateTime | 생성 시간                               |
| updatedAt | DateTime | 수정 시간                               |

- index 설정: userId와 createdAt을 복합 인덱스로 설정하여, 사용자별 최신 운세 데이터 검색 시 검색 속도를 크게 향상

### Code(TD_FT_CODE)

> 코드 테이블
>
> - 설계 전략 : 코드로 되어있는 데이터를 관리하는 테이블
>
> ```
> 단순 코드만 보고 이게 어떠할 때 쓰는 코드인 지 description 칼럼을 추가하여 설명을 추가할 수 있음
> fortuneType의 경우 SUCCESS, MONEY 등의 코드값을 이용
> 프론트에서는 보여지는 값이 각각 성공운, 재물운으로 보여짐
> 이에 따라서 프론트에 보여지는 name도 있게하고, 추후 영문 name도 추가할 수 있도록 확장성 있게 설계
> (Code 테이블) N : (사용하는 테이블) 1 관계로 설계
> categoryName은 추후 확장 가능성이 좋게 Code 테이블과 1:N 관계로 설계
> ```

| Field        | Type                      | Description                       |
| ------------ | ------------------------- | --------------------------------- |
| code         | CodeFields (enum)         | 고유 코드 식별자 (PK)             |
| name         | String                    | 코드 이름                         |
| categoryName | CodeCategoryFields (enum) | (FK) CodeCategory 테이블의 외래키 |
| createdAt    | DateTime                  | 생성 시간                         |
| updatedAt    | DateTime                  | 수정 시간                         |

### CodeCategory(TD_FT_CODE_CATEGORY)

> 코드의 카테고리 테이블
>
> - 설계 전략 : 코드 테이블의 범주를 정해주고자 설계한 테이블
>
> ```
> Code를 쓰는 곳에서 카테고리 별로 정리할 수 있게 설계
> 카테고리를 추가 및 변경할 수 있도록 확장성이 좋게 설계
> Code 테이블과 마찬가지로 추후 description 설계 가능
> ```

| Field     | Type                      | Description           |
| --------- | ------------------------- | --------------------- |
| name      | CodeCategoryFields (enum) | 고유 코드 식별자 (PK) |
| createdAt | DateTime                  | 생성 시간             |
| updatedAt | DateTime                  | 수정 시간             |
