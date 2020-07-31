<template>

	<swiper class="application-background" ref="slider" :options="swiperOptions">
	    <swiper-slide v-for="slide in slides" :key="slide">
		    <div class="background-image">
			    <img :data-src="slide" class="swiper-lazy">
			    <div class="swiper-lazy-preloader"></div>
		    </div>
	    </swiper-slide>
	</swiper>

</template>

<script>

	export default {
		name: 'app-background',

		data() {
			return {

				swiperOptions: {
					effect: 'fade',
					preloadImages: false,
					lazy: {
						loadPrevNext: true
					},
					pagination: false,
					navigation: false,
					allowTouchMove: false,
					autoplay: {
						delay: 15000,
					},
				}

			};
		},

		computed: {

			slides() {
				return this.$store.getters.backgrounds || ['/img/bg.jpg'];
			},

		},

	};

</script>

<style lang="scss" scoped>

	.application-background {
		position: absolute;
		z-index: 1;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;

		.background-image {
			width: 100%;
			height: 100%;
			background-color: #1a1b19;

			img {
				width: 100%;
				height: 100%;
				object-position: center;
				object-fit: cover;
				opacity: 0.4;
			}
		}

	}

</style>