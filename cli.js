#!/usr/bin/env node

const program = require("commander");
const { print, Format } = require("./");
const { readStream } = require("./util");
const { version, description } = require("./package.json");

const formatStringMap = {
	"default": Format.DEFAULT,
	"escape": Format.ESCAPE,
	"octal-escape": Format.OCTAL_ESCAPE,
	"hex-escape": Format.HEX_ESCAPE,
	"hex": Format.HEX,
	"octal": Format.OCTAL,
	"binary": Format.BINARY,
};

const formatConverter = format => {

	if (!formatStringMap.hasOwnProperty(format)) {

		console.error(`Unknown format '${format}'`);
		return process.exit(1);
	}

	return formatStringMap[format];
};

program
	.description(description)
	.version(version)
	.arguments("<string>")
	.option("-f, --format [type]", `Set the output format (${Object.keys(formatStringMap).join("|")}). Default is 'default'`, formatConverter, Format.DEFAULT)
	.option("-s, --separator [value]", "Set the string that separates output values. Default is ' ' (space)", " ")
	.option("-S", "Don't separate output values (equivalent to -s '')")
	.parse(process.argv);

const printOptions = {
	format: program.format,
	separator: program.S ? "" : program.separator
};

// If data exists in STDIN (pipe)
if (!process.stdin.isTTY) {

	// If a string was also passed to the program, error and exit
	if (program.args.length > 0) {
		console.error("You cannot pipe and pass a string at the same time");
		return process.exit(1);
	}

	// Read from STDIN and print as data arrives
	return readStream(process.stdin, data => print(data, printOptions));
}

// Otherwise if no data in STDIN and no string passed, show help
if (program.args.length === 0) {
	program.help();
	return process.exit(1);
}

// Otherwise print the string passed
const string = program.args.join(" ");
print(string, printOptions);