<template>
 <div class="app-status-bar">
	 <div class="api-status status">
		 <div class="indicator" :class="['indicator-'+connection.state]"></div>
		 {{ connection.state }}
	 </div>
 </div>
</template>

<script>

 export default {
	 name: "app-status-bar",

	 props: {},

	 data() {
		 return {};
	 },

	 methods: {},

	 computed: {

	 	connection() {
	 		return this.$store.getters.connection;
	    }

	 },

	 components: {},

 };

</script>

<style lang="scss" scoped>

    .app-status-bar {
	    display: flex;
	    justify-content: flex-end;
	    color: var(--base-color-light);
	    padding: 0.01rem;
	    font-size: 0.8em;
	    height: $status-bar-height;

	    .status {
		    display: flex;
		    text-transform: capitalize;
		    align-items: center;

		    .indicator {
			    -webkit-margin-end: 0.01rem;
			    border-radius: 100%;
			    background-color: white;
			    width: 1em;
			    height: 1em;

			    &-connected {
				    background-color: var(--base-success-color);
			    }

			    &-reconnecting {
				    background-color: var(--base-worning-color);
			    }

			    &-error {
				    background-color: var(--base-error-color);
			    }

		    }
	    }

    }

</style>