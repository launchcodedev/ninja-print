const { print: ninprint } = require("./");

ninprint("Hello world.");
ninprint("Line feed:\n");
ninprint("Carriage return:\r");
ninprint("Null character:\0");
ninprint(new Buffer([0x00, 0x01, 0x02, 0x03, 0x04, 0x05]));