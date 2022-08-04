export interface MongooseValidationError {
  error: Error;
}

export interface Error {
  errors: Errors;
  _message: string;
  message: string;
}

export interface Errors {
  [key: string]: ErrorName;
}

export interface ErrorName {
  name: string;
  message: string;
  properties: Properties;
  kind: string;
  path: string;
}

export interface Properties {
  message: string;
  type: string;
  path: string;
}
