import Vue from 'vue';
import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';

const requireComponent = require.context('@/components', false, /[A-Z]\w+\.(vue)$/,);

requireComponent.keys().forEach(fileName => {
	const componentConfig = requireComponent(fileName);
	const componentName = upperFirst(camelCase(fileName.split('/').pop().replace(/\.\w+$/, '')));

	console.log(componentName);


	Vue.component(componentName, componentConfig.default || componentConfig);
});

const requireDevices = require.context('@/components/Device', false, /[A-Z]\w+\.(vue)$/,);

requireDevices.keys().forEach(fileName => {
	const componentConfig = requireDevices(fileName);
	const componentName = 'Device'+upperFirst(camelCase(fileName.split('/').pop().replace(/\.\w+$/, '')));

	console.log(componentName);


	Vue.component(componentName, componentConfig.default || componentConfig);
});