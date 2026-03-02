export interface Flatrate {
	display_priority: number;
	logo_path: string;
	provider_id: number;
	provider_name: string;
}

export interface Rent {
	display_priority: number;
	logo_path: string;
	provider_id: number;
	provider_name: string;
}

export interface Buy {
	display_priority: number;
	logo_path: string;
	provider_id: number;
	provider_name: string;
}

export interface WatchRegion {
	iso_3166_1: string;
	english_name: string;
	native_name: string;
}

export interface WatchRegionsResponse {
	results: WatchRegion[];
}

export interface WatchProviderEntry {
	display_priority: number;
	logo_path: string | null;
	provider_id: number;
	provider_name: string;
}

export type WatchLocale = Record<
	string,
	{
		link: string;
		flatrate?: WatchProviderEntry[];
		rent?: WatchProviderEntry[];
		buy?: WatchProviderEntry[];
		free?: WatchProviderEntry[];
		ads?: WatchProviderEntry[];
	}
>;

export interface WatchProviders {
	id: number;
	results: WatchLocale;
}

export interface WatchProviderListItem {
	display_priority: number;
	logo_path: string | null;
	provider_id: number;
	provider_name: string;
}

export interface WatchProviderListResponse {
	results: WatchProviderListItem[];
}
