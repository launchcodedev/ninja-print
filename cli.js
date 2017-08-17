
const { print } = require("./");

// Read a stream and return a buffer when it ends
const readStream = (stream, dataHandler) => new Promise((resolve, reject) => {

	const buffers = [];

	stream.on("data", data => {

		buffers.push(data);
		
		if (dataHandler)
			dataHandler(data);
	});
	stream.on("error", error => reject(error));
	stream.on("end", () => resolve(Buffer.concat(buffers)));
});

// Read from STDIN and print as they arrive
readStream(process.stdin, data => print(data));