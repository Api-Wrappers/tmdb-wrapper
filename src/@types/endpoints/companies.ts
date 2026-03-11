import type { Image } from "..";
import type { Nullable } from "../wire";

export interface CompanyDetails {
	description: string;
	headquarters: string;
	homepage: Nullable<string>;
	id: number;
	logo_path: Nullable<string>;
	name: string;
	origin_country: string;
	parent_company: Nullable<ParentCompany>;
}

export interface ParentCompany {
	name: string;
	id: number;
	logo_path: Nullable<string>;
}

export interface AlternativeNames {
	id: number;
	results: Name[];
}

export interface Name {
	name: string;
	type: string;
}

export interface CompanyImages {
	id: number;
	logos: Image[];
}
