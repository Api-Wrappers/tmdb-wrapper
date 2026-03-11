import {
	BaseEndpoint,
	type CollectionImageOptions,
	type DetailedCollection,
	type ImageCollection,
	type LanguageOption,
	type TokenType,
	type Translations,
} from "../@types";

const BASE_COLLECTION = "/collection";

/**
 * Represents an endpoint for accessing collections and their details.
 */
export class CollectionsEndpoint extends BaseEndpoint {
	/**
	 * Constructs a new CollectionsEndpoint instance.
	 *
	 * @param {TokenType} auth - The authentication configuration.
	 */
	constructor(protected readonly auth: TokenType) {
		super(auth);
	}

	/**
	 * Retrieves details of a specific collection asynchronously.
	 *
	 * @param {number} id - The ID of the collection.
	 * @param {LanguageOption} [options] - Optional parameters for specifying the
	 * language.
	 * @returns {Promise<DetailedCollection>} A Promise that resolves with the
	 * detailed information of the collection.
	 */
	details(id: number, options?: LanguageOption): Promise<DetailedCollection> {
		return this.api.get<DetailedCollection>(`${BASE_COLLECTION}/${id}`, {
			query: options,
		});
	}

	/**
	 * Retrieves images associated with a specific collection asynchronously.
	 *
	 * @param {number} id - The ID of the collection.
	 * @param {CollectionImageOptions} [options] - Optional parameters for
	 * specifying image options.
	 * @returns {Promise<ImageCollection>} A Promise that resolves with the
	 * collection images.
	 */
	images(
		id: number,
		options?: CollectionImageOptions,
	): Promise<ImageCollection> {
		const computedOptions = {
			include_image_language: options?.include_image_language?.join(","),
			language: options?.language,
		};

		return this.api.get<ImageCollection>(`${BASE_COLLECTION}/${id}/images`, {
			query: computedOptions,
		});
	}

	/**
	 * Retrieves translations for a specific collection asynchronously.
	 *
	 * @param {number} id - The ID of the collection.
	 * @param {LanguageOption} [options] - Optional parameters for specifying the
	 * language.
	 * @returns {Promise<Translations>} A Promise that resolves with the
	 * translations of the collection.
	 */
	translations(id: number, options?: LanguageOption): Promise<Translations> {
		return this.api.get<Translations>(`${BASE_COLLECTION}/${id}/translations`, {
			query: options,
		});
	}
}
