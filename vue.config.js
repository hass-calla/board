module.exports = {
	"devServer": {
		"proxy": "http://127.0.0.1:3333"
	},
	"outputDir": "../CallaServer/public/board",
	"indexPath": process.env.NODE_ENV === 'production' ? '../../resources/views/board.edge' : 'index.html',
	pwa: {
		name: 'Calla',
		themeColor: '#1AAEE0',
		manifestOptions: {
			display: 'fullscreen',
			background_color: '#B8C6C4',
		},
	},
	css: {
		loaderOptions: {
			sass: {
				prependData: `
					@import "@/scss/_variables.scss";
					@import "@/scss/_mixins.scss";
				`
			}
		}
	}
};