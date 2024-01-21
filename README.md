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

## API Docs

공용 response

```json
{
    "code": "정의한 코드 - number",
}   "result": "결과값 - 에러타입 혹은 반환값의 타입"
```

### 응답 코드

| Http-Status | Code | Description                     |
| ----------- | ---- | ------------------------------- |
| 200         | 1000 | 요청 성공                       |
| 200         | 1001 | 요청은 성공했지만 데이터가 없음 |

### 에러 코드

| Http-Status | Code | Description                       |
| ----------- | ---- | --------------------------------- |
| 400         | 2000 | 요청값 오류 - Bad Request         |
| 500         | 2001 | 서버 에러 - Internal Server Error |
| 401         | 3001 | 유효하지 않은 유저 정보           |
| 401         | 3002 | 비밀번호 미일치                   |
| 401         | 5000 | 토큰이 없는 경우                  |
| 401         | 5001 | 유효하지 않은 토큰                |
| 401         | 5002 | Jwt Access 토큰 만료              |
| -           | 9000 | 정의되자 않은 에러 코드           |

### Auth

> 유저 인증에 관한 도메인

- @POST/ 'api/auth/login'
- @Body: { userId, password }
  유저에 대하여 로그인을 처리하는 api
  서비스 로직에서 validateUser 메서드를 통해 유저에 대하여 검증을 진행하고,
  검증이 완료된 경우, httpOnly 속성을 갖는 Jwt 토큰을 cookie에 넣는다.
  이 때, payload에 넣는 값은 로그인 한 유저의 id 값을 넣는다.

### Code

> 코드에 관한 도메인

- @GET/ 'api/code/today-fortune'
- @Param: x
- @Header: access_token 쿠키 필요
  화면에 오늘의 운세에 관련하여 재물운, 성공운, 당첨운과 같은 데이터를 보여주기 위한 api
  서비스 로직에서 카테고리 별 코드를 가지고 온 후 가지고 온 값을 리턴해준다.

### Fortune

> 오늘의 운세에 관한 도메인

- @GET/ 'api/fortune'
- @Param: x
- @Header: access_token 쿠키 필요
  유저가 오늘 확인한 오늘의 운세가 있는지 확인하기 위한 api
  확인한 결과가 있다면, 해당 운세를 리턴, 없으면 코드 1001, 결과값을 null 리턴해준다.

```json
오늘 운세를 확인한 경우
{
    "code": 1000,
    "result": {
        "fortune": {
            "id": 5,
            "content": "운세 2",
            "fortuneType": "SUCCESS",
            "fortuneStatus": "GOOD",
            "createdAt": "2024-01-21T02:53:10.605Z",
            "updatedAt": "2024-01-21T02:53:10.605Z"
        }
    },
}
```

```json
오늘 운세를 확인하지 않은 경우
{
    "code": 1001,
    "result": null,

}
```

- @POST/ 'api/fortune/create'
- @Body: { fortuneType - SUCCESS, MONEY, WINNING }
- @Header: access_token 쿠키 필요
  유저가 선택한 종류의 운세 종류로 오늘의 운세를 만들어주는 api.
  운세의 상태(GOOD, AVERAGE, BAD)의 값에 따라 균등하게 계산하여 나온 운세와 로그인한 유저 아이디를 매핑 테이블에 생성.

```json
{
    "code": 1000,
    "result": {
        "id": 3,
        "content": "운세 3",
        "fortuneType": "SUCCESS",
        "fortuneStatus": "BAD",
        "createdAt": "2024-01-21T02:53:10.605Z",
        "updatedAt": "2024-01-21T02:53:10.605Z"
    },
}
```
