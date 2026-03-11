import {
	BaseEndpoint,
	type CollectionImageOptions,
	type DetailedCollection,
	type ImageCollection,
	type LanguageOption,
	type TokenType,
	type Translations,
} from "../@types";
import { csv, type RequestConfig, withQuery } from "../utils";

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
	 * @param {RequestConfig} [request] - Optional request behavior overrides.
	 * @returns {Promise<DetailedCollection>} A Promise that resolves with the
	 * detailed information of the collection.
	 */
	details(
		id: number,
		options?: LanguageOption,
		request?: RequestConfig,
	): Promise<DetailedCollection> {
		return this.api.get<DetailedCollection>(
			`${BASE_COLLECTION}/${id}`,
			withQuery(options, request),
		);
	}

	/**
	 * Retrieves images associated with a specific collection asynchronously.
	 *
	 * @param {number} id - The ID of the collection.
	 * @param {CollectionImageOptions} [options] - Optional parameters for
	 * specifying image options.
	 * @param {RequestConfig} [request] - Optional request behavior overrides.
	 * @returns {Promise<ImageCollection>} A Promise that resolves with the
	 * collection images.
	 */
	images(
		id: number,
		options?: CollectionImageOptions,
		request?: RequestConfig,
	): Promise<ImageCollection> {
		const query = {
			include_image_language: csv(options?.include_image_language),
			language: options?.language,
		};

		return this.api.get<ImageCollection>(
			`${BASE_COLLECTION}/${id}/images`,
			withQuery(query, request),
		);
	}

	/**
	 * Retrieves translations for a specific collection asynchronously.
	 *
	 * @param {number} id - The ID of the collection.
	 * @param {LanguageOption} [options] - Optional parameters for specifying the
	 * language.
	 * @param {RequestConfig} [request] - Optional request behavior overrides.
	 * @returns {Promise<Translations>} A Promise that resolves with the
	 * translations of the collection.
	 */
	translations(
		id: number,
		options?: LanguageOption,
		request?: RequestConfig,
	): Promise<Translations> {
		return this.api.get<Translations>(
			`${BASE_COLLECTION}/${id}/translations`,
			withQuery(options, request),
		);
	}
}
