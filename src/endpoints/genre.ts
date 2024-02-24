import { BaseEndpoint, Genres, LanguageOption } from '@/@types';

/**
 * Represents an endpoint for retrieving genre information for movies and TV shows.
 */
export class GenreEndpoint extends BaseEndpoint {
  /**
   * Constructs a new GenreEndpoint instance.
   * @param {string} access_token - The access token used for authentication.
   */
  constructor(protected readonly access_token: string) {
    super(access_token);
  }

  /**
   * Retrieves genre information for movies asynchronously.
   * @param {LanguageOption} [options] - Optional parameters for specifying the language.
   * @returns {Promise<Genres>} A Promise that resolves with the genre information for movies.
   */
  async movies(options?: LanguageOption): Promise<Genres> {
    return await this.api.get<Genres>('/genre/movie/list', options);
  }

  /**
   * Retrieves genre information for TV shows asynchronously.
   * @param {LanguageOption} [options] - Optional parameters for specifying the language.
   * @returns {Promise<Genres>} A Promise that resolves with the genre information for TV shows.
   */
  async tv(options?: LanguageOption): Promise<Genres> {
    return await this.api.get<Genres>('/genre/tv/list', options);
  }
}
