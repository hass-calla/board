const icons = {};

const files = require.context('!raw-loader!!svgo-loader!./assets/icons', true, /\.svg$/);

files.keys().forEach((icon) => {
	const name = (icon.replace('./', '').split('.')[0] || '').replace('/', '::');

	icons[name] = files(icon).default;
});

export default function icon(key, useException = false) {
	if(! icons[key]) {
		const message = `Icon with the name ${key} not exists!`;

		if(! useException) {
			console.error(message);
			return "";
		}

		throw new Error(message);
	}

	return icons[key];
}

window.$allIcons = icons;