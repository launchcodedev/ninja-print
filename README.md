<div align="center">
<img alt="Ninja Print title" src="https://secure.servalldatasystems.com/servall_dev_files/ninja-print/ninja-print.png" width="536.5px">
</div>

### *Finding those ninja characters*

<img alt="Ninja Print demo" src="https://secure.servalldatasystems.com/servall_dev_files/ninja-print/ninja-print.gif" height="225px" width="400px">

# What is it?

`ninprint` is a utility for printing human-readable special characters.

Are you ever working with binary or string data that contains special characters (NUL, CR, LF, etc)? Unfortunately standard print commands (`echo`, `printf`, `console.log`, etc) will not display special characters, making it difficult to determine exactly where they exist in a `string`. `ninprint` makes your life easy by printing out a human-readable form of each character.

# Installation

`ninprint` requires [NodeJS](https://nodejs.org) and [NPM](https://www.npmjs.com)/[Yarn](https://yarnpkg.com).

#### NPM
```bash
npm install -g ninprint
```
#### Yarn

```bash
yarn global add ninprint
```

# Examples

You can pipe output from other processes into `ninprint`:
```bash
$ printf "From pipe: \0\r\n" | ninprint

F r o m [SPACE] p i p e : [SPACE] [NUL] [CR] [LF]
```

Anything sent to `stdin` will be processed:
```bash
$ printf "From file: \b\f\t" > test.bin
$ ninprint < test.bin

F r o m [SPACE] f i l e : [SPACE] [BS] [FF] [TAB]
```

# Node Module
You can also use `ninprint` as a Node/Webpack module.

#### NPM
```bash
npm install ninprint
```
#### Yarn

```bash
yarn add ninprint
```

## Examples

You can `print` directly to the console:

```javascript
const { print } = require("ninprint");

print("Hello world.");
// Output:
//     H e l l o [SPACE] w o r l d .

print("Line feed:\n");
// Output:
//     L i n e [SPACE] f e e d : [LF]
```

You can use `convert` to return a string:

```javascript
const { convert } = require("ninprint");

const test1 = convert("Carriage return:\r");
console.log(test1);
// Output:
//     C a r r i a g e [SPACE] r e t u r n : [CR]

const test2 = convert("Null character:\0");
console.log(test2);
// Output:
//     N u l l [SPACE] c h a r a c t e r : [NUL]
```

You can also pass a `Buffer` to `print`/`convert`:

```javascript

const { print, convert } = require("ninprint");

print(new Buffer([0x00, 0x01, 0x02, 0x03, 0x04, 0x05]));
// Output:
//     [NUL] [SOH] [STX] [ETX] [EOT] [ENQ]

const test3 = convert(new Buffer([0x06, 0x07, 0x08, 0x09, 0x0A, 0x0B]));
console.log(test3);
// Output:
//     [ACK] [BEL] [BS] [TAB] [LF] [VT]
```

# License
[MIT](LICENSE)
