import { AlternativeNames, BaseEndpoint, CompanyDetails, CompanyImages } from '@/@types';

export class CompaniesEndpoint extends BaseEndpoint {
  constructor(protected readonly access_token: string) {
    super(access_token);
  }

  async details(id: number): Promise<CompanyDetails> {
    return await this.api.get<CompanyDetails>(`/company/${id}`);
  }

  async alternativeNames(id: number): Promise<AlternativeNames> {
    return await this.api.get<AlternativeNames>(`/company/${id}/alternative_names`);
  }

  async images(id: number): Promise<CompanyImages> {
    return await this.api.get<CompanyImages>(`/company/${id}/images`);
  }
}
