const { printCharacters } = require("./");

printCharacters("Hello world.");
printCharacters("Line feed:\n");
printCharacters("Carriage return:\r");
printCharacters("Null character:\0");
printCharacters(new Buffer([0x00, 0x01, 0x02, 0x03, 0x04, 0x05]));