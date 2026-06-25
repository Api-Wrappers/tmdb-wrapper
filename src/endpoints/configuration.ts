import {
	BaseEndpoint,
	type Configuration,
	type ConfigurationCountry,
	type ConfigurationJob,
	type ConfigurationLanguage,
	type ConfigurationTimezone,
	type LanguageOption,
} from "../@types";
import { type RequestConfig, withQuery } from "../utils";

/**
 * Represents an endpoint for retrieving current system configuration.
 */
export class ConfigurationEndpoint extends BaseEndpoint {
	/**
	 * Retrieves the current system configuration asynchronously.
	 *
	 * @returns {Promise<Configuration>} A Promise that resolves with the current
	 * system configuration.
	 */
	getCurrent(request?: RequestConfig): Promise<Configuration> {
		return this.api.get<Configuration>("/configuration", request);
	}

	/**
	 * Retrieves the list of countries used throughout TMDB.
	 */
	countries(
		options?: LanguageOption,
		request?: RequestConfig,
	): Promise<ConfigurationCountry[]> {
		return this.api.get<ConfigurationCountry[]>(
			"/configuration/countries",
			withQuery(options, request),
		);
	}

	/**
	 * Retrieves TMDB's department/job mapping.
	 */
	jobs(request?: RequestConfig): Promise<ConfigurationJob[]> {
		return this.api.get<ConfigurationJob[]>("/configuration/jobs", request);
	}

	/**
	 * Retrieves the list of languages used throughout TMDB.
	 */
	languages(request?: RequestConfig): Promise<ConfigurationLanguage[]> {
		return this.api.get<ConfigurationLanguage[]>(
			"/configuration/languages",
			request,
		);
	}

	/**
	 * Retrieves the list of primary translations supported by TMDB.
	 */
	primaryTranslations(request?: RequestConfig): Promise<string[]> {
		return this.api.get<string[]>(
			"/configuration/primary_translations",
			request,
		);
	}

	/**
	 * Retrieves the list of timezones used throughout TMDB.
	 */
	timezones(request?: RequestConfig): Promise<ConfigurationTimezone[]> {
		return this.api.get<ConfigurationTimezone[]>(
			"/configuration/timezones",
			request,
		);
	}
}
