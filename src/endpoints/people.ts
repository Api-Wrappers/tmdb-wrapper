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
	 * @returns {Promise<AppendToResponse<PersonDetails, T, "person">>} A
	 * Promise that resolves with the details of the person.
	 */
	details<T extends AppendToResponsePersonKey[] | undefined>(
		id: number,
		appendToResponse?: T,
		language?: string,
	): Promise<AppendToResponse<PersonDetails, T, "person">> {
		const options = {
			append_to_response: appendToResponse
				? appendToResponse.join(",")
				: undefined,
			language,
		};

		return this.api.get<AppendToResponse<PersonDetails, T, "person">>(
			`${BASE_PERSON}/${id}`,
			{ query: options },
		);
	}

	/**
	 * Retrieves changes made to a specific person asynchronously.
	 *
	 * @param {number} id - The ID of the person.
	 * @param {ChangeOption} [options] - Optional parameters for filtering
	 * changes.
	 * @returns {Promise<Changes<PersonChangeValue>>} A Promise that resolves
	 * with the changes made to the person.
	 */
	changes(
		id: number,
		options?: ChangeOption,
	): Promise<Changes<PersonChangeValue>> {
		return this.api.get<Changes<PersonChangeValue>>(
			`${BASE_PERSON}/${id}/changes`,
			{ query: options },
		);
	}

	/**
	 * Retrieves movie credits of a specific person asynchronously.
	 *
	 * @param {number} id - The ID of the person.
	 * @param {LanguageOption} [options] - Optional parameters for specifying the
	 * language.
	 * @returns {Promise<PersonMovieCredit>} A Promise that resolves with the
	 * movie credits of the person.
	 */
	movieCredits(
		id: number,
		options?: LanguageOption,
	): Promise<PersonMovieCredit> {
		return this.api.get<PersonMovieCredit>(
			`${BASE_PERSON}/${id}/movie_credits`,
			{ query: options },
		);
	}

	/**
	 * Retrieves TV show credits of a specific person asynchronously.
	 *
	 * @param {number} id - The ID of the person.
	 * @param {LanguageOption} [options] - Optional parameters for specifying the
	 * language.
	 * @returns {Promise<PersonTvShowCredit>} A Promise that resolves with the
	 * TV show credits of the person.
	 */
	tvShowCredits(
		id: number,
		options?: LanguageOption,
	): Promise<PersonTvShowCredit> {
		return this.api.get<PersonTvShowCredit>(`${BASE_PERSON}/${id}/tv_credits`, {
			query: options,
		});
	}

	/**
	 * Retrieves combined credits of a specific person asynchronously.
	 *
	 * @param {number} id - The ID of the person.
	 * @param {LanguageOption} [options] - Optional parameters for specifying the
	 * language.
	 * @returns {Promise<PersonCombinedCredits>} A Promise that resolves with the
	 * combined credits of the person.
	 */
	combinedCredits(
		id: number,
		options?: LanguageOption,
	): Promise<PersonCombinedCredits> {
		return this.api.get<PersonCombinedCredits>(
			`${BASE_PERSON}/${id}/combined_credits`,
			{ query: options },
		);
	}

	/**
	 * Retrieves external IDs of a specific person asynchronously.
	 *
	 * @param {number} id - The ID of the person.
	 * @returns {Promise<ExternalIds>} A Promise that resolves with the external
	 * IDs of the person.
	 */
	externalId(id: number): Promise<ExternalIds> {
		return this.api.get<ExternalIds>(`${BASE_PERSON}/${id}/external_ids`);
	}

	/**
	 * Retrieves images of a specific person asynchronously.
	 *
	 * @param {number} id - The ID of the person.
	 * @returns {Promise<PeopleImages>} A Promise that resolves with the images
	 * of the person.
	 */
	images(id: number): Promise<PeopleImages> {
		return this.api.get<PeopleImages>(`${BASE_PERSON}/${id}/images`);
	}

	/**
	 * Retrieves tagged images of a specific person asynchronously.
	 *
	 * @param {number} id - The ID of the person.
	 * @param {PageOption} [options] - Optional parameters for specifying
	 * pagination options.
	 * @returns {Promise<TaggedImages>} A Promise that resolves with the tagged
	 * images of the person.
	 */
	taggedImages(id: number, options?: PageOption): Promise<TaggedImages> {
		return this.api.get<TaggedImages>(`${BASE_PERSON}/${id}/tagged_images`, {
			query: options,
		});
	}

	/**
	 * Retrieves translations of a specific person asynchronously.
	 *
	 * @param {number} id - The ID of the person.
	 * @returns {Promise<PersonTranslations>} A Promise that resolves with the
	 * translations of the person.
	 */
	translation(id: number): Promise<PersonTranslations> {
		return this.api.get<PersonTranslations>(
			`${BASE_PERSON}/${id}/translations`,
		);
	}

	/**
	 * Retrieves details of the latest person asynchronously.
	 *
	 * @returns {Promise<PersonDetails>} A Promise that resolves with the details
	 * of the latest person.
	 */
	latest(): Promise<PersonDetails> {
		return this.api.get<PersonDetails>(`${BASE_PERSON}/latest`);
	}

	/**
	 * Retrieves popular persons asynchronously.
	 *
	 * @param {LanguageOption & PageOption} [options] - Optional parameters for
	 * specifying language and pagination options.
	 * @returns {Promise<PopularPersons>} A Promise that resolves with the
	 * popular persons.
	 */
	popular(options?: LanguageOption & PageOption): Promise<PopularPersons> {
		return this.api.get<PopularPersons>(`${BASE_PERSON}/popular`, {
			query: options,
		});
	}
}
