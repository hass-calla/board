<template>
	<header class="application-header">
		<div class="start">
			<a href="" class="header-item button">
				<span class="icon" v-html="$icon('arrow-left')"></span>
			</a>

			<div class="page-title">
				{{page.title}}
			</div>
		</div>

		<div class="middle">

		</div>

		<div class="end">
			<app-clock :clock-settings="headerSettings.clock || {}"></app-clock>

			<a @click="toggleFullscreen" class="header-item button full-screen">
				<span class="icon" v-html="$icon(fullScreenActive ? 'minimize' : 'maximize')"></span>
			</a>
		</div>
	</header>
</template>

<script>
import AppClock from "./AppClock";
const appElId = "#app";

export default {
	name: "app-header",

	props: {},

	data() {
		return {
			fullScreenActive: false,
		};
	},

	mounted() {
		document.querySelector(appElId).addEventListener('fullscreenchange', (event) => {
			this.fullScreenActive = !! document.fullscreenElement;
			this.$root.$emit('fullscreen');
		});
	},

	methods: {

		async toggleFullscreen() {
			if(this.fullScreenActive) {
				this.exitFullscreen();
			}

			else {
				this.enterFullscreen();
			}
		},

		async enterFullscreen() {
			const el = document.querySelector(appElId);

			if (el.requestFullscreen) {
				await el.requestFullscreen();
			}
			else if (el.mozRequestFullScreen) {
				el.mozRequestFullScreen();
			}
			else if (el.webkitRequestFullscreen) {
				el.webkitRequestFullscreen();
			}
			else if (el.msRequestFullscreen) {
				el.msRequestFullscreen();
			}
		},

		async exitFullscreen() {
			if (document.exitFullscreen) {
				await document.exitFullscreen();
			}
			else if (document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			}
			else if (document.webkitExitFullscreen) {
				document.webkitExitFullscreen();
			}
			else if (document.msExitFullscreen) {
				document.msExitFullscreen();
			}
		},

	},

	computed: {
		page() {
			return this.$store.getters.currentPage;
		},

		headerSettings() {
			return this.$store.getters.header;
		}

	},

	components: {AppClock},
};

</script>

<style lang="scss" scoped>

    .application-header {
	    display: flex;
	    width: 100%;
	    height: $header-height;
	    /*border-bottom: 1px solid var(--base-color-lighter);*/
	    align-items: stretch;
	    justify-content: stretch;
	    box-sizing: content-box;
	    color: var(--base-color);

	    .page-title {
		    font-size: 1.2em;
		    -webkit-margin-start: $header-spacing;
		    color: var(--base-primary-color);
	    }

	    > div {
		    display: flex;
		    align-items: center;
	    }

	    .middle {
		    flex-grow: 1;
	    }

	    .header-item {
		    padding: 4px;
		    display: flex;
		    height: 100%;
		    min-width: $sidebar-width;
	    }

	    .button {
		    width: $header-height;
		    color: var(--base-color-light);

		    .icon {
			    width: 100%;
			    height: 100%;
			    display: flex;
			    align-items: center;
			    justify-content: center;
		    }

		    ::v-deep svg {
			    width: auto;
			    height: 100%;
		    }

	    }

    }

</style>