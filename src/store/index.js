import Vue from 'vue';
import Vuex from 'vuex';
import Api from "../api";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		ready: false,

		connection: {
			state: 'connecting',
			message: '',
		},

		currentPage: {
			title: ""
		},

		entitiesState: {},

		config: {
			lang: 'en',

			header: {
				clock: {
					sunEntity: 'sun.sun',
					dateFormat: 'dddd, MMMM DD, YYYY',
					timeFormat: 'HH:mm:ss'
				}
			},

			background: [
				"/img/bg.jpg",
				"/img/bg2.jpg",
			],

			pages: require("../pages").default,

		}
	},

	getters: {

		ready(state) {
			return state.ready;
		},

		connection(state) {
			return state.connection;
		},

		header(state) {
			return (state.config.header || {});
		},

		backgrounds(state) {
			return (state.config.background || []);
		},

		pages(state) {
			return state.config.pages || [];
		},

		mainPage(state) {
			return (state.config.pages || [])[0];
		},

		page: (state) => (id) => {
			return (state.config || {pages: []}).pages.find(page => page.id === id);
		},

		entitiesState(state) {
			return state.entitiesState;
		},

		entityState: (state) => (id) => {
			return state.entitiesState[id] || null;
		},

		currentPage(state) {
			return state.currentPage;
		}
	},

	mutations: {

		appReady(state) {
			state.ready = true;
		},

		connectionState(state, {status, message = ""}) {
			state.connection.state = status;
			state.connection.message = message;
		},

		updateEntitiesState(state, entityState) {
			state.entitiesState = entityState;
		},

		currentPage(state, {title = ""}) {
			state.currentPage.title = title || "";
		}

	},

	actions: {

	},

	modules: {},
});
