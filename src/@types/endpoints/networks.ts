import type { Image } from "..";
import type { Nullable } from "../wire";

export interface NetworkDetails {
	headquarters: string;
	homepage: Nullable<string>;
	id: number;
	logo_path: Nullable<string>;
	name: string;
	origin_country: string;
}

export interface NetworkImages {
	id: number;
	logos: Image[];
}
