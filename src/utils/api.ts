import { ErrorResponse } from '@/@types';

const BASE_URL_V3 = 'https://api.themoviedb.org/3';

export class API {
  private access_token: string;
  constructor(access_token: string) {
    this.access_token = access_token;
  }

  async get<T>(path: string, options?: Record<string, any>): Promise<T> {
    const params = parseOptions(options);
    const response = await fetch(`${BASE_URL_V3}${path}?${params}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.access_token}`,
        'Content-Type': 'application/json;charset=utf-8',
      },
    });

    if (!response.ok) {
      return Promise.reject((await response.json()) as ErrorResponse);
    }

    return (await response.json()) as T;
  }
}

export const parseOptions = (options?: Record<string, any>): string => {
  return options ? new URLSearchParams(Object.entries(options)).toString() : '';
};
