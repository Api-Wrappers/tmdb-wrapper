import { BaseEndpoint, Certifications } from '@/@types';

export class CertificationEndpoint extends BaseEndpoint {
  constructor(protected readonly access_token: string) {
    super(access_token);
  }

  async movies(): Promise<Certifications> {
    return await this.api.get<Certifications>('/certification/movie/list');
  }

  async tv(): Promise<Certifications> {
    return await this.api.get<Certifications>('/certification/tv/list');
  }
}
