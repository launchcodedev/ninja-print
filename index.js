const characterTable = require("./character-table.json");

const print = (value, encoding = "ascii") => {

	// Value is a String
	if (typeof(value) === "string" || value instanceof String)
		return printFromString(value);

	// Value is a Buffer, first convert to String
	else if (value instanceof Buffer)
		return printFromString(value.toString(encoding));

	// Value has an unknown type
	else
		throw `Value passed must be a String or Buffer`;
}

const printFromString = string => {

	const symbols = [];

	for (let i = 0; i < string.length; i++) {

		const charCode = string.charCodeAt(i);
		const symbol = characterTable[charCode].default;

		symbols.push(symbol || string[i]);
	}

	console.log(symbols.join(" "));
};

module.exports = {
	print: print
};