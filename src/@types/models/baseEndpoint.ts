import { API } from "../../utils";
import type { TokenType } from "../types";

export class BaseEndpoint {
	protected api: API;

	constructor(protected readonly auth: TokenType) {
		this.api = new API(auth);
	}
}
