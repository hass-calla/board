import Vue from 'vue';
import VueRouter from 'vue-router';
import Page from '../views/Page';

Vue.use(VueRouter);

const routes = [
	{
		path: '/:pageId?',
		name: 'page',
		component: Page,
		props: true
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
