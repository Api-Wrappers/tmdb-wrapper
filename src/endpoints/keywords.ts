import { BaseEndpoint, BelongingMovies, Keyword, KeywordsOptions } from '@/@types';

const BASE_Keyword = '/keyword';

export class KeywordsEndpoint extends BaseEndpoint {
  constructor(access_token: string) {
    super(access_token);
  }

  async details(keywordId: number): Promise<Keyword> {
    return await this.api.get<Keyword>(`${BASE_Keyword}/${keywordId}`);
  }

  async belongingMovies(keywordId: number, options?: KeywordsOptions): Promise<BelongingMovies> {
    return await this.api.get<BelongingMovies>(`${BASE_Keyword}/${keywordId}/movies`, options);
  }
}
