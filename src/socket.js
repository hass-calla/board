import {createConnection, subscribeEntities, createLongLivedTokenAuth} from "home-assistant-js-websocket";
import config from "./config";
import store from './store/index';


export default class Socket {

	constructor() {
		this.baseUrl = config('SERVER_URL');
		this.token = config('API_TOKEN');
	}

	/**
	 *
	 * @return {Promise<Auth>}
	 */
	async auth() {
		return await createLongLivedTokenAuth(
			this.baseUrl,
			this.token
		);
	}

	/**
	 *
	 * @return {Promise<{auth: Auth}>}
	 */
	async connectionOptions() {
		return {
			auth: await this.auth()
		};
	}

	/**
	 *
	 * @return {Promise<Socket>}
	 */
	connect() {
		return this.connectionOptions()
			.then(config => createConnection(config))
			.then(connection => {
				this.connection = connection;

				this.listen();

				return Promise.resolve(connection);
			})
			.then(() => Promise.resolve(this))
			.catch((e) => console.log(e));
	}

	listen() {
		store.commit('connectionState', {status: 'connected'});

		this.connection.addEventListener('ready', (e) => {
			store.commit('connectionState', {status: 'connected'});
		});

		this.connection.addEventListener('disconnected', (e) => {
			store.commit('connectionState', {status: 'reconnecting'});
		});

		this.connection.addEventListener('reconnect-error', (e) => {
			store.commit('connectionState', {status: 'error'});
		});
	}

	subscribe(callback) {
		return subscribeEntities(this.connection, callback);
	}

}