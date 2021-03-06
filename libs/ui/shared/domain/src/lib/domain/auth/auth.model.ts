import { HttpContextToken } from '@angular/common/http';

export interface LoginInput {
  username: string;
  password: string;
}

export interface SignupInput {
  username: string;
  email: string;
  firstname?: string;
  lastname?: string;
}

export enum HttpHeaderKey {
  ACCESS_CONTROL_EXPOSE_HEADERS = 'Access-Control-Expose-Headers',
  CONTENT_TYPE = 'Content-Type',
  JWT_TOKEN = 'Jwt-Token',
  JWT_REFRESH_TOKEN = 'Jwt-Refresh-Token',
  LOCATION = 'Location',
}

export interface AccountActivationInput {
  token: string;
  email: string;
  password: string;
}

export enum TokenKeys {
  TOKEN = 'token',
  REFRESH_TOKEN = 'refreshToken',
}

export const USE_REFRESH_TOKEN = new HttpContextToken<boolean>(() => false);
