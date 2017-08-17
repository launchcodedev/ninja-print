const { convert } = require("./");

const assert = (condition, message) => {

    if (!condition)
		throw new Error(message || "Assertion failed");
};

assert(convert("Hello world.") === "H e l l o [SPACE] w o r l d .");
assert(convert("Line feed:\n") === "L i n e [SPACE] f e e d : [LF]");
assert(convert("Carriage return:\r") === "C a r r i a g e [SPACE] r e t u r n : [CR]");
assert(convert("Null character:\0") === "N u l l [SPACE] c h a r a c t e r : [NUL]");
assert(convert(new Buffer([0x00, 0x01, 0x02, 0x03, 0x04, 0x05])) === "[NUL] [SOH] [STX] [ETX] [EOT] [ENQ]");

console.log("All tests passed");