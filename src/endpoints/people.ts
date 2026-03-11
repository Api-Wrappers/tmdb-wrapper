import {
	type AppendToResponse,
	type AppendToResponsePersonKey,
	BaseEndpoint,
	type ChangeOption,
	type Changes,
	type ExternalIds,
	type LanguageOption,
	type PageOption,
	type PeopleImages,
	type PersonChangeValue,
	type PersonCombinedCredits,
	type PersonDetails,
	type PersonMovieCredit,
	type PersonTranslations,
	type PersonTvShowCredit,
	type PopularPersons,
	type TaggedImages,
	type TokenType,
} from "../@types";
import { csv, type RequestConfig, withQuery } from "../utils";

const BASE_PERSON = "/person";

/**
 * Represents an endpoint for accessing information about people.
 */
export class PeopleEndpoint extends BaseEndpoint {
	/**
	 * Constructs a new PeopleEndpoint instance.
	 *
	 * @param {TokenType} auth - The authentication configuration.
	 */
	constructor(protected readonly auth: TokenType) {
		super(auth);
	}

	/**
	 * Retrieves details of a specific person asynchronously.
	 *
	 * @param {number} id - The ID of the person.
	 * @param {AppendToResponsePersonKey[]} [appendToResponse] - Optional keys to
	 * append to the response.
	 * @param {string} [language] - Optional parameter for specifying the
	 * language.
	 * @param {RequestConfig} [request] - Optional request behavior overrides.
	 * @returns {Promise<AppendToResponse<PersonDetails, T, "person">>} A
	 * Promise that resolves with the details of the person.
	 */
	details<T extends AppendToResponsePersonKey[] | undefined>(
		id: number,
		appendToResponse?: T,
		language?: string,
		request?: RequestConfig,
	): Promise<AppendToResponse<PersonDetails, T, "person">> {
		const query = {
			append_to_response: csv(appendToResponse),
			language,
		};

		return this.api.get<AppendToResponse<PersonDetails, T, "person">>(
			`${BASE_PERSON}/${id}`,
			withQuery(query, request),
		);
	}

	/**
	 * Retrieves changes made to a specific person asynchronously.
	 *
	 * @param {number} id - The ID of the person.
	 * @param {ChangeOption} [options] - Optional parameters for filtering
	 * changes.
	 * @param {RequestConfig} [request] - Optional request behavior overrides.
	 * @returns {Promise<Changes<PersonChangeValue>>} A Promise that resolves
	 * with the changes made to the person.
	 */
	changes(
		id: number,
		options?: ChangeOption,
		request?: RequestConfig,
	): Promise<Changes<PersonChangeValue>> {
		return this.api.get<Changes<PersonChangeValue>>(
			`${BASE_PERSON}/${id}/changes`,
			withQuery(options, request),
		);
	}

	/**
	 * Retrieves movie credits of a specific person asynchronously.
	 *
	 * @param {number} id - The ID of the person.
	 * @param {LanguageOption} [options] - Optional parameters for specifying the
	 * language.
	 * @param {RequestConfig} [request] - Optional request behavior overrides.
	 * @returns {Promise<PersonMovieCredit>} A Promise that resolves with the
	 * movie credits of the person.
	 */
	movieCredits(
		id: number,
		options?: LanguageOption,
		request?: RequestConfig,
	): Promise<PersonMovieCredit> {
		return this.api.get<PersonMovieCredit>(
			`${BASE_PERSON}/${id}/movie_credits`,
			withQuery(options, request),
		);
	}

	/**
	 * Retrieves TV show credits of a specific person asynchronously.
	 *
	 * @param {number} id - The ID of the person.
	 * @param {LanguageOption} [options] - Optional parameters for specifying the
	 * language.
	 * @param {RequestConfig} [request] - Optional request behavior overrides.
	 * @returns {Promise<PersonTvShowCredit>} A Promise that resolves with the
	 * TV show credits of the person.
	 */
	tvShowCredits(
		id: number,
		options?: LanguageOption,
		request?: RequestConfig,
	): Promise<PersonTvShowCredit> {
		return this.api.get<PersonTvShowCredit>(
			`${BASE_PERSON}/${id}/tv_credits`,
			withQuery(options, request),
		);
	}

	/**
	 * Retrieves combined credits of a specific person asynchronously.
	 *
	 * @param {number} id - The ID of the person.
	 * @param {LanguageOption} [options] - Optional parameters for specifying the
	 * language.
	 * @param {RequestConfig} [request] - Optional request behavior overrides.
	 * @returns {Promise<PersonCombinedCredits>} A Promise that resolves with the
	 * combined credits of the person.
	 */
	combinedCredits(
		id: number,
		options?: LanguageOption,
		request?: RequestConfig,
	): Promise<PersonCombinedCredits> {
		return this.api.get<PersonCombinedCredits>(
			`${BASE_PERSON}/${id}/combined_credits`,
			withQuery(options, request),
		);
	}

	/**
	 * Retrieves external IDs of a specific person asynchronously.
	 *
	 * @param {number} id - The ID of the person.
	 * @param {RequestConfig} [request] - Optional request behavior overrides.
	 * @returns {Promise<ExternalIds>} A Promise that resolves with the external
	 * IDs of the person.
	 */
	externalId(id: number, request?: RequestConfig): Promise<ExternalIds> {
		return this.api.get<ExternalIds>(
			`${BASE_PERSON}/${id}/external_ids`,
			request,
		);
	}

	/**
	 * Retrieves images of a specific person asynchronously.
	 *
	 * @param {number} id - The ID of the person.
	 * @param {RequestConfig} [request] - Optional request behavior overrides.
	 * @returns {Promise<PeopleImages>} A Promise that resolves with the images
	 * of the person.
	 */
	images(id: number, request?: RequestConfig): Promise<PeopleImages> {
		return this.api.get<PeopleImages>(`${BASE_PERSON}/${id}/images`, request);
	}

	/**
	 * Retrieves tagged images of a specific person asynchronously.
	 *
	 * @param {number} id - The ID of the person.
	 * @param {PageOption} [options] - Optional parameters for specifying
	 * pagination options.
	 * @param {RequestConfig} [request] - Optional request behavior overrides.
	 * @returns {Promise<TaggedImages>} A Promise that resolves with the tagged
	 * images of the person.
	 */
	taggedImages(
		id: number,
		options?: PageOption,
		request?: RequestConfig,
	): Promise<TaggedImages> {
		return this.api.get<TaggedImages>(
			`${BASE_PERSON}/${id}/tagged_images`,
			withQuery(options, request),
		);
	}

	/**
	 * Retrieves translations of a specific person asynchronously.
	 *
	 * @param {number} id - The ID of the person.
	 * @param {RequestConfig} [request] - Optional request behavior overrides.
	 * @returns {Promise<PersonTranslations>} A Promise that resolves with the
	 * translations of the person.
	 */
	translation(
		id: number,
		request?: RequestConfig,
	): Promise<PersonTranslations> {
		return this.api.get<PersonTranslations>(
			`${BASE_PERSON}/${id}/translations`,
			request,
		);
	}

	/**
	 * Retrieves details of the latest person asynchronously.
	 *
	 * @param {RequestConfig} [request] - Optional request behavior overrides.
	 * @returns {Promise<PersonDetails>} A Promise that resolves with the details
	 * of the latest person.
	 */
	latest(request?: RequestConfig): Promise<PersonDetails> {
		return this.api.get<PersonDetails>(`${BASE_PERSON}/latest`, request);
	}

	/**
	 * Retrieves popular persons asynchronously.
	 *
	 * @param {LanguageOption & PageOption} [options] - Optional parameters for
	 * specifying language and pagination options.
	 * @param {RequestConfig} [request] - Optional request behavior overrides.
	 * @returns {Promise<PopularPersons>} A Promise that resolves with the
	 * popular persons.
	 */
	popular(
		options?: LanguageOption & PageOption,
		request?: RequestConfig,
	): Promise<PopularPersons> {
		return this.api.get<PopularPersons>(
			`${BASE_PERSON}/popular`,
			withQuery(options, request),
		);
	}
}
