const characterTable = require("./character-table.json");

const Format = Object.freeze({
    DEFAULT: Symbol("default"),
    ESCAPE: Symbol("escape"),
    OCTAL_ESCAPE: Symbol("octal-escape"),
    HEX_ESCAPE: Symbol("hex-escape"),
    HEX: Symbol("hex"),
    OCTAL: Symbol("octal"),
    BINARY: Symbol("binary")
});

const print = (value, options) => console.log(convert(value, options));

const convert = (value, { encoding = "utf8", format = Format.DEFAULT, separator = " " } = {}) => {

	if (value === null)
		return null;

	// Value is a String
	if (typeof(value) === "string" || value instanceof String)
		return convertString(value, format, separator);

	// Value is a Buffer, first convert to String
	else if (value instanceof Buffer)
		return convertString(value.toString(encoding), format, separator);

	// Value has an unknown type
	else
		throw `Value passed must be a String or Buffer`;
};

const convertString = (string, format, separator) => {

	const symbols = [];

	for (let i = 0; i < string.length; i++) {
		
		let symbol = string[i];
		const charCode = string.charCodeAt(i);

		switch (format) {
			
			case Format.HEX:
				symbol = charCode.toString("16").toUpperCase().padStart(2, "0");
				break;
				
			case Format.OCTAL:
				symbol = charCode.toString("8").padStart(3, "0");
				break;
				
			case Format.BINARY:
				symbol = charCode.toString("2").padStart(8, "0");
				break;
				
			case Format.HEX_ESCAPE:
				symbol = `\\x${charCode.toString("16").toUpperCase()}`;
				break;

			case Format.OCTAL_ESCAPE:
				symbol = `\\${charCode.toString("8")}`;
				break;

			case Format.ESCAPE:
			case Format.DEFAULT:
			default:

			const character = characterTable[charCode];

			if (character && character.default) {

				symbol = character.default;

				switch (format) {

					case Format.ESCAPE:
						symbol = character.escape || symbol;
				}
			}
		}

		symbols.push(symbol);
	}

	return symbols.join(separator);
};

module.exports = {
	print: print,
	convert: convert,
	Format: Format
};