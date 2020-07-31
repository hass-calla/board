import "./scss/app.scss";

import Api from "./api";
import Socket from "./socket";
import icon from "./icons";
import config from "./config";

import Vue from 'vue';
import './autoload';

import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

import {Swiper as
		SwiperClass,
		Pagination,
		Mousewheel,
		Autoplay,
		Lazy,
		EffectFade} from 'swiper/core';

import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter';

SwiperClass.use([Pagination, Mousewheel, Autoplay, Lazy, EffectFade]);

Vue.config.productionTip = false;

Vue.prototype.$api = new Api;
Vue.prototype.$socket = new Socket;
Vue.prototype.$icon = icon;
Vue.prototype.$config = config;

Vue.use(getAwesomeSwiper(SwiperClass));

new Vue({
	router,

	store,

	render: h => h(App),

	async created() {
		await this.$api.check();
		await this.$socket.connect();

		let init = false;

		this.$socket.subscribe((state) => {
			if (! init) {
				init = true;
				this.$store.commit('appReady');
			}

			this.$store.commit('updateEntitiesState', state);
		});

	},

}).$mount('#app');
