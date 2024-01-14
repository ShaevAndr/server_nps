type ValidationError = {
    errors: unknown;
  };
  
export type AmoBodyError<T = ValidationError> = {
    ['validation-errors']: Array<T>;
    title: string;
    status: number;
};

export type AmoError = {
    response: {
        data: AmoBodyError;
    };
};