const characterTable = require("./character-table.json");

const print = (value, encoding) => console.log(convert(value, encoding));

const convert = (value, encoding = "utf8") => {

	// Value is a String
	if (typeof(value) === "string" || value instanceof String)
		return convertString(value);

	// Value is a Buffer, first convert to String
	else if (value instanceof Buffer)
		return convertString(value.toString(encoding));

	// Value has an unknown type
	else
		throw `Value passed must be a String or Buffer`;
};

const convertString = string => {

	const symbols = [];

	for (let i = 0; i < string.length; i++) {

		const charCode = string.charCodeAt(i);
		const character = characterTable[charCode];
		const symbol = character && character.default || string[i];

		symbols.push(symbol);
	}

	return symbols.join(" ");
};

module.exports = {
	print: print,
	convert: convert
};