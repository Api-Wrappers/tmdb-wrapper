import { BaseEndpoint, ChangeOption, MediaChanges } from '@/@types';

export class ChangeEndpoint extends BaseEndpoint {
  constructor(protected readonly access_token: string) {
    super(access_token);
  }

  async movies(options?: ChangeOption): Promise<MediaChanges> {
    return await this.api.get<MediaChanges>(`/movie/changes`, options);
  }

  async tv(options?: ChangeOption): Promise<MediaChanges> {
    return await this.api.get<MediaChanges>(`/tv/changes`, options);
  }

  async person(options?: ChangeOption): Promise<MediaChanges> {
    return await this.api.get<MediaChanges>(`/person/change`, options);
  }
}
