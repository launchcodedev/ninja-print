const { print: ninprint } = require("./");

// Read a stream and return a buffer
const readStream = stream => new Promise((resolve, reject) => {

	const buffers = [];

	process.stdin.on("data", data => buffers.push(data));
	process.stdin.on("error", error => reject(error));
	process.stdin.on("end", () => resolve(Buffer.concat(buffers)));
});

// Read from STDIN and print the symbols
readStream(process.stdin).then(data => {
	ninprint(data);
});