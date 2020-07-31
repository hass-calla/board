<template>
	<div class="app-device device"
	     @click="onClick"
	     :class="['size-'+size.join('-'), isActive ? 'is-active' : '']">

		<div class="app-device-container">
			<component :is="component"
			           :size="size"
			           v-bind="device.props"
			           ref="component"></component>
		</div>
	</div>
</template>

<script>
import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';

export default {
	name: "app-device",

	props: {
		device: [Object]
	},

	data() {
		return {
			isActive: false,
			hasSinglePage: true,
			size: [1, 1],
			minSize: [1, 1]
		};
	},

	methods: {

		onClick() {
			this.isActive = ! this.isActive;
		},

		register() {

		},

		update() {

		}

	},

	computed: {

		component() {
			return upperFirst(camelCase('device-'+this.device.component));
		},


	},

	components: {},

};

</script>

<style lang="scss" scoped>

    .app-device {
	    padding: 0.03rem;
	    position: relative;
	    border-radius: 0.01rem;
	    overflow: hidden;

	    .app-device-container {
		    position: relative;
		    z-index: 3;
	    }

	    &:before {
		    content: "";
		    position: absolute;
		    left: 0;
		    right: 0;
		    top: 0;
		    bottom: 0;
		    background-color: rgba(255, 255, 255, .05);
		    backdrop-filter: blur(5px);
		    opacity: 1;
		    transition: opacity 0.1s ease-in-out;
		    z-index: 1;
	    }

	    &:after {
		    content: "";
		    position: absolute;
		    left: 0;
		    right: 0;
		    top: 0;
		    bottom: 0;
		    background-color: rgba(53, 174, 126, 0.2);
		    backdrop-filter: blur(5px);
		    transform-origin: center;
		    transform: scale(0);
		    border-radius: 100%;
		    opacity: 0;
		    transition: all 0.2s ease;
		    z-index: 2;
	    }

	    &.is-active {
		    &:before {
			    opacity: 0;
		    }

		    &:after {
			    opacity: 1;
			    border-radius: 0;
			    transform: scale(1);
		    }
	    }

    }

</style>