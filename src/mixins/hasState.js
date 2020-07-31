export default {

	computed: {
		stateObject() {
			return this.$store.getters.entityState(this.entityId);
		},

		state() {
			return (this.stateObject || {}).state;
		},

		attributes() {
			return (this.stateObject || {}).attributes || {};
		},
	}

}