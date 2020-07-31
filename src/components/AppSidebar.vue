<template>
	<aside class="application-sidebar">

		<div class="middle">

			<router-link v-for="(page, index) in pages"
			             class="button"
			             :key="page.id"
			             exact-active-class="is-active"
			             exact
			             :to="{name: 'page', params: {pageId: index === 0 ? null : page.id}}">
				<span class="icon" v-html="$icon(page.icon)"></span>
			</router-link>

		</div>
	</aside>
</template>

<script>

 export default {
	name: "app-sidebar",

	props: {},

	data() {
		return {

		};
	},

	methods: {},

	computed: {

		pages() {
			return this.$store.getters.pages;
		}

	},

	components: {},

 };
 
</script>

<style lang="scss" scoped>

    .application-sidebar {
	    flex-grow: 0;
	    flex-shrink: 0;
	    width: $sidebar-width;
	    color: white;
	    display: flex;
	    flex-direction: column;

	    .middle {
		    flex-grow: 1;
		    display: flex;
		    flex-direction: column;
		    justify-content: center;
	    }

	    .button {
		    width: $sidebar-width;
		    height: $sidebar-width;
		    padding: 0.015rem;
		    color: var(--base-color-lighter);
		    display: block;
		    transition: 0.3s ease-in-out all;

		    .icon {
			    display: block;
			    width: 100%;
			    height: 100%;
		    }

		    &.is-active {
			    background-color: var(--base-primary-color);
			    color: var(--base-primary-color-invert);
		    }
	    }

    }

</style>