import {
  BaseEndpoint,
  CollectionImageOptions,
  DetailedCollection,
  ImageCollection,
  LanguageOption,
  Translations,
} from '@/@types';

const BASE_COLLECTION = '/collection';

/**
 * Represents an endpoint for accessing collections and their details.
 */
export class CollectionsEndpoint extends BaseEndpoint {
  /**
   * Constructs a new CollectionsEndpoint instance.
   * @param {string} access_token - The access token used for authentication.
   */
  constructor(protected readonly access_token: string) {
    super(access_token);
  }

  /**
   * Retrieves details of a specific collection asynchronously.
   * @param {number} id - The ID of the collection.
   * @param {LanguageOption} [options] - Optional parameters for specifying the language.
   * @returns {Promise<DetailedCollection>} A Promise that resolves with the detailed information of the collection.
   */
  async details(id: number, options?: LanguageOption): Promise<DetailedCollection> {
    return await this.api.get<DetailedCollection>(`${BASE_COLLECTION}/${id}`, options);
  }

  /**
   * Retrieves images associated with a specific collection asynchronously.
   * @param {number} id - The ID of the collection.
   * @param {CollectionImageOptions} [options] - Optional parameters for specifying image options.
   * @returns {Promise<ImageCollection>} A Promise that resolves with the collection images.
   */
  async images(id: number, options?: CollectionImageOptions): Promise<ImageCollection> {
    const computedOptions = {
      include_image_language: options?.include_image_language?.join(','),
      language: options?.language,
    };
    return await this.api.get<ImageCollection>(`${BASE_COLLECTION}/${id}/images`, computedOptions);
  }

  /**
   * Retrieves translations for a specific collection asynchronously.
   * @param {number} id - The ID of the collection.
   * @param {LanguageOption} [options] - Optional parameters for specifying the language.
   * @returns {Promise<Translations>} A Promise that resolves with the translations of the collection.
   */
  async translations(id: number, options?: LanguageOption): Promise<Translations> {
    return await this.api.get<Translations>(`${BASE_COLLECTION}/${id}/translations`, options);
  }
}
