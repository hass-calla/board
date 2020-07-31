<template>
	<div class="application" :style="applicationStyle" id="app">
		<app-background></app-background>

		<div class="application-content-container">
			<app-header></app-header>

			<div class="content-group">
				<app-sidebar></app-sidebar>

				<div class="content">
					<router-view></router-view>
				</div>
			</div>

			<app-status-bar></app-status-bar>
		</div>

	</div>
</template>

<script>
  import AppBackground from "./components/AppBackground";
  import AppHeader from "./components/AppHeader";
  import AppSidebar from "./components/AppSidebar";
  import AppStatusBar from "./components/AppStatusBar";

  export default {
	  data() {
		  return {
			  height: '0px',
			  canGoBack: false,
		  };
	  },

	  created() {
		  this.calcSize();
		  this.$on('fullscreen', this.calcSize);
		  window.addEventListener('resize', this.calcSize);
	  },

	  methods: {
		calcSize() {
			const {width, height} = document.body.getBoundingClientRect();

			this.height = width > height ? height : width;
			document.documentElement.style.fontSize = `${this.height}px`;
		},
	  },

	  computed: {

		  applicationStyle() {
			  return {
				  'font-size': '0.03rem',
				  '--base-font-size': `${this.height}px`,
				  '--base-color': `white`,
				  '--base-color-light': `#898889`,
				  '--base-color-lighter': `#4c494a`,
				  '--base-color-invert': `black`,
				  '--base-color-invert-light': `rgba(0, 0, 0, 0.5)`,
				  '--base-color-invert-lighter': `rgba(0, 0, 0, 0.2)`,
				  '--base-primary-color': `rgb(53, 174, 126)`,
				  '--base-primary-color-invert': `white`,
			  };
		  },

		  loading() {
			  return ! this.$store.getters.ready;
		  },

	  },

	  components: {
		  AppStatusBar,
		  AppSidebar,
		  AppHeader,
		  AppBackground,
	  },

  };

</script>

<style lang="scss">

	.application {
		position: relative;
		font-size: rem(18);
		min-height: 100%;
		min-width: 100%;
		display: flex;
		flex-direction: column;

		--base-font-size: 600px;
		--base-color: white;
		--base-color-light: #898889;
		--base-color-lighter: #4c494a;
		--base-color-invert: black;
		--base-color-invert-light: rgba(0, 0, 0, 0.5);
		--base-color-invert-lighter: rgba(0, 0, 0, 0.2);
		--base-primary-color: rgb(53, 174, 126);
		--base-primary-color-invert: white;

		--base-success-color: #4fc650;
		--base-worning-color: #ffac2e;
		--base-error-color: #ff3531;

		.application-content-container {
			position: relative;
			z-index: 2;
			flex-grow: 1;
			display: flex;
			flex-direction: column;
		}

		.content-group {
			flex-grow: 1;
			display: flex;

			.content {
				flex-grow: 1;
				display: flex;
				flex-direction: column;
				width: calc(100vw - #{$sidebar-width});
			}
		}

	}

</style>
