import axios from 'axios';
import config from "./config";

class ApiResponse {

	constructor(res) {
		this._original = res;
		this.isError = false;

		if(res instanceof Error) {
			this.isError = true;
		}

	}

	data() {
		if(this.isError) {
			return this._original.response.data;
		}

		return this._original.data;
	}

}

export default class Api {


	constructor() {
		this.baseUrl = config('SERVER_URL')+config('API_PATH');
		this.token = config('API_TOKEN');

		this.client = axios.create({
			baseURL: this.baseUrl,
			timeout: 1000,
			headers: {
				'Authorization': 'Bearer ' + this.token,
				'Content-Type': 'application/json'
			}
		});
	}

	async get(path, query = {}, config = {}) {
		return await this.response(
			await this.client.get(path, {
				params: query,
				...config
			})
		);
	}

	async post(path, data = {}, config = {}) {
		return await this.response(
			await this.client.post(path, data, config)
		);
	}

	async check() {
		try {
			return await this.get('/');
		}
		catch (e) {
			console.dir(e);

			throw e;
		}
	}

	async call(domain, service, entities, payload = {}) {
		entities = Array.isArray(entities) ? entities : [entities];

		return await this.post(`services/${domain}/${service}`, {
			...payload,
			entity_id: entities
		});
	}

	async response(res) {
		return new ApiResponse(res);
	}


}