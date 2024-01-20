export interface PayloadInterface {
  id: number;
  iat: number;
  exp: number;
}

export interface BaseExceptionErrorStateInferface {
  code: number;
  result: {
    error: {
      message: string;
    };
  };
}
