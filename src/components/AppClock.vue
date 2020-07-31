<template>
	<div class="app-clock">
		<div class="sun icon"
		     :class="['sun-icon-'+sunIcon]"
		     v-if="entityId"
		     v-html="$icon(sunIcon)">
		</div>

		<div class="clock-face">
			<div class="date" v-if="date">
				{{ date }}
			</div>

			<div class="time" v-if="time">
				<span v-for="(num, index) in time" :key="'time-'+index+num">
					{{ num }}
				</span>
			</div>
		</div>
	</div>
</template>

<script>
	import moment from 'moment';
	import hasState from "../mixins/hasState";

	export default {
		name: "app-clock",

		props: {
			clockSettings: [Object],
		},

		mixins: [hasState],

		data() {
			return {
				date: null,
				time: null,
				timer: null
			};
		},

		created() {
			this.tick();
		},

		beforeDestroy() {
			if(this.clock) {
				clearTimeout(this.clock);
			}
		},

		methods: {
			tick() {
				const date = moment();

				if(this.clockSettings.dateFormat) {
					this.date = date.format(this.clockSettings.dateFormat);
				}
				else {
					this.date = null;
				}

				if(this.clockSettings.timeFormat) {
					this.time = date.format(this.clockSettings.timeFormat).split('');
				}
				else {
					this.time = null;
				}

				this.clock = setTimeout(this.tick, 1000);
			}
		},

		computed: {
			entityId() {
				return this.clockSettings.sunEntity || '';
			},

			sunIcon() {
				return this.state === 'below_horizon' ? 'sunset' : 'sunshine';
			}

		},

		components: {},

	};

</script>

<style lang="scss" scoped>

    .app-clock {
	    color: var(--base-color-light);
	    display: flex;

	    .icon {
		    width: $header-height;
	    }

	    .clock-face {
		    display: flex;
		    align-items: center;
		    -webkit-margin-start: $header-spacing;
		    font-size: 1.2em;

		    .time {
			    -webkit-margin-start: $header-spacing;

			    > span {
				    display: inline-block;
				    min-width: 0.6485em;
				    text-align: center;
			    }
		    }
	    }

    }

</style>