export default function (key, defaultValue = null) {
	const bucket = process.env || {};
	key = (key || '').toUpperCase();
	let value = bucket[`VUE_APP_${key}`];

	switch (value) {
		case "true":
			value = true;
			break;
		case "false":
			value = false;
	}

	return value === undefined ? defaultValue : value;
}