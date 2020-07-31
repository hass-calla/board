<template>
	<div class="page home-page">
		<div class="page-container">
			<div class="group size-5">
				<div class="group-header">
					<h3 class="group-title"></h3>
				</div>

				<div class="group-devices">
					<app-device :device="{size: [1, 1], component: 'light'}"></app-device>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

import AppDevice from "../components/AppDevice";
export default {
	components: {AppDevice},
	props: {
		pageId: [Number, String],
	},

	watch: {
		$route() {
			this.updateCurrentPage();
		}
	},

	mounted() {
		this.updateCurrentPage();
	},

	methods: {
		updateCurrentPage() {
			this.$store.commit('currentPage', {
				title: this.page.title
			});
		}
	},

	computed: {
		page() {
			if(! this.pageId) {
				return this.$store.getters.mainPage;
			}

			return this.$store.getters.page(this.pageId);
		},

		groups() {
			return this.$store.getters.devices;
		}
	}

};
</script>

<style lang="scss" scoped>

  .page {
	  overflow: auto;
	  flex-grow: 1;
	  display: flex;
	  color: var(--base-color);
	  width: 100%;

	  &-container {
		  padding: 0.02rem 0.02rem 0 0.02rem;
		  display: flex;
	  }

	  .group {
		  flex-grow: 1;
		  display: flex;
		  flex-direction: column;
		  width: $device-size;

		  &.size-2 {
			  width: $device-size * 2;
		  }

		  &.size-3 {
			  width: $device-size * 3;
		  }

		  &.size-4 {
			  width: $device-size * 4;
		  }

		  &.size-5 {
			  width: $device-size * 5;
		  }

		  &.size-6 {
			  width: $device-size * 6;
		  }

		  &-header {
			  flex-grow: 0;
			  height: 0.04rem;
		  }

		  &-devices {
			  display: grid;
			  grid-gap: 0.010rem;
			  grid-template-columns: repeat(auto-fill, $device-size - 0.010rem);
			  grid-auto-rows: $device-size - 0.010rem;
			  grid-auto-flow: dense;
		  }

		  & + .group {
			  -webkit-margin-start: 0.04rem;
		  }
	  }
  }

	.device {
		grid-row-end: span 1;

		@for $i from 1 through 4 {
			@for $i2 from 1 through 3 {
				&.size-#{$i}#{'-'}#{$i2} {
					grid-row-end: span $i2;
					grid-column-end: span $i;
				}
			}
		}
	}

</style>