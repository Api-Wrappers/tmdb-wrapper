import { BaseEndpoint, ReviewDetails } from '@/@types';

export class ReviewEndpoint extends BaseEndpoint {
  constructor(access_token: string) {
    super(access_token);
  }

  async details(id: string): Promise<ReviewDetails> {
    return await this.api.get<ReviewDetails>(`/review/${id}`);
  }
}
