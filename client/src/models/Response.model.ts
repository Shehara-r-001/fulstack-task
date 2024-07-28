enum RESPONSE_STATUS {
  FAIL = 'FAIL',
  SUCCESS = 'SUCCESS',
}

export interface IResponse<T> {
  status: RESPONSE_STATUS;
  message: string | null;
  data: T;
}
