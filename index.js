const characterTable = require("./character-table.json");

const printCharacters = (value, encoding = "ascii") => {

	// Value is a String
	if (typeof(value) === "string" || value instanceof String)
		return printCharactersFromString(value);

	// Value is a Buffer, first convert to String
	else if (value instanceof Buffer)
		return printCharactersFromString(value.toString(encoding));

	// Value has an unknown type
	else
		throw `Value passed must be a String or Buffer`;
}

const printCharactersFromString = string => {

	const symbols = [];

	for (let i = 0; i < string.length; i++) {

		const charCode = string.charCodeAt(i);
		const symbol = characterTable[charCode];

		symbols.push(symbol || string[i]);
	}

	console.log(symbols.join(" "));
};

module.exports = {
	printCharacters: printCharacters
};