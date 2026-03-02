import type { Review } from "..";

export interface ReviewDetails extends Review {
	iso_639_1: string;
	media_id: number;
	media_title: string;
	media_type: number;
}
