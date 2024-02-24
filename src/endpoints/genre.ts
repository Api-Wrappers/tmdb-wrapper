import { BaseEndpoint, LanguageOption } from '@/@types';

export interface Genres {
  genres: Array<{ id: number; name: string }>;
}

export class GenreEndpoint extends BaseEndpoint {
  constructor(protected readonly access_token: string) {
    super(access_token);
  }

  async movies(options?: LanguageOption): Promise<Genres> {
    return await this.api.get<Genres>('/genre/movie/list', options);
  }

  async tv(options?: LanguageOption): Promise<Genres> {
    return await this.api.get<Genres>('/genre/tv/list', options);
  }
}
