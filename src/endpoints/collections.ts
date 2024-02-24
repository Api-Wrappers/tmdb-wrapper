import {
  BaseEndpoint,
  CollectionImageOptions,
  DetailedCollection,
  ImageCollection,
  LanguageOption,
  Translations,
} from '@/@types';

const BASE_COLLECTION = '/collection';

export class CollectionsEndpoint extends BaseEndpoint {
  constructor(protected readonly access_token: string) {
    super(access_token);
  }

  async details(id: number, options?: LanguageOption): Promise<DetailedCollection> {
    return await this.api.get<DetailedCollection>(`${BASE_COLLECTION}/${id}`, options);
  }

  async images(id: number, options?: CollectionImageOptions): Promise<ImageCollection> {
    const computedOptions = {
      include_image_language: options?.include_image_language?.join(','),
      language: options?.language,
    };
    return await this.api.get<ImageCollection>(`${BASE_COLLECTION}/${id}/images`, computedOptions);
  }

  async translations(id: number, options?: LanguageOption): Promise<Translations> {
    return await this.api.get<Translations>(`${BASE_COLLECTION}/${id}/translations`, options);
  }
}
