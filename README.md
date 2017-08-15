# Character Printer

Character Printer is a utility for printing human-readable special characters.

Are you ever working with low-level binary or string data that contains special characters (NUL, CR, LF, etc)? Unfortunately `console.log()` has no way to display special characters, making it difficult to determine exactly where they exist in a `String` or `Buffer`. Character Printer makes your life easy by printing out a human readable form of each character.

## Installation
#### NPM
```bash
npm install character-printer
```
#### Yarn

```bash
yarn add character-printer
```

## Examples
```javascript
const { printCharacters } = require("character-printer");

printCharacters("Hello world.");
// Output:
//     H e l l o [SPACE] w o r l d .

printCharacters("Line feed:\n");
// Output:
//     L i n e [SPACE] f e e d : [LF]

printCharacters("Carriage return:\r");
// Output:
//     C a r r i a g e [SPACE] r e t u r n : [CR]

printCharacters("Null character:\0");
// Output:
//     N u l l [SPACE] c h a r a c t e r : [NUL]

printCharacters(new Buffer([0x00, 0x01, 0x02, 0x03, 0x04, 0x05]));
// Output:
//     [NUL] [SOH] [STX] [ETX] [EOT] [ENQ]
```

## Command Line Interface (CLI)
You can also use the command line interface to print characters from other processes or files using pipe.

#### NPM
```bash
npm install -g character-printer
```
#### Yarn

```bash
yarn global add character-printer
```

Examples:

```bash
$ printf "From pipe: \0\r\n" | character-printer

F r o m [SPACE] p i p e : [SPACE] [NUL] [CR] [LF]
```
```bash
$ printf "From file: \b\f\t" > test.bin
$ character-printer < test.bin

F r o m [SPACE] f i l e : [SPACE] [BS] [FF] [TAB]
```

# License
[MIT](LICENSE)