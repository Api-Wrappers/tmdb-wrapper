import { BaseEndpoint, LanguageOption, TimeWindow, TrendingMediaType, TrendingResults } from '@/@types';

export class TrendingEndpoint extends BaseEndpoint {
  constructor(access_token: string) {
    super(access_token);
  }

  async trending<T extends TrendingMediaType>(
    mediaType: T,
    timeWindow: TimeWindow,
    options?: LanguageOption,
  ): Promise<TrendingResults<T>> {
    return await this.api.get<TrendingResults<T>>(`/trending/${mediaType}/${timeWindow}`, options);
  }
}
