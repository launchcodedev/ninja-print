<div align="center">
    <img alt="Ninja Print title" src="https://secure.servalldatasystems.com/servall_dev_files/ninja-print/ninja-print.png" width="536.5px">
    <h3><em>Finding those ninja characters</em></h3>
    <img alt="Ninja Print demo" src="https://secure.servalldatasystems.com/servall_dev_files/ninja-print/ninja-print.gif" width="400px">
</div>

<br />

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/servall/ninja-print/master/LICENSE)
[![npm](https://img.shields.io/npm/v/ninprint.svg)](https://www.npmjs.com/package/ninprint)

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

Pipe in files:
```bash
$ printf "From file: \b\f\t" > test.bin
$ ninprint < test.bin

F r o m [SPACE] f i l e : [SPACE] [BS] [FF] [TAB]
```

Pass a string as an argument:
```bash
$ ninprint "Test"

T e s t
```

Bash requires `$'abc'` syntax for escape characters:
```bash
$ ninprint $'Test\r\n'

T e s t [CR] [LF]
```
Note: `ninprint $'Test\0\r\n'` will terminate after `Test` because of the `\0` null character.

# Options

* `-f, --format [type]`:

  Set the output format. Format types are:
  
  * `default`:
  
    Print zero-width special characters and spaces using their abreviated form. Print all other characters as is.
    
    ```bash
    $ printf "Test \0\r\n" | ninprint -f default

    T e s t [SPACE] [NUL] [CR] [LF]
    ```
  
  * `escape`:
  
    Print common C-style escape sequences. Print all other characters as `default`.

    Supported escape sequence characters are:
    
    | Character | Escape |
    | --------- |--------|
    | `[NUL]`   | `\0`   |
    | `[BEL]`   | `\a`   |
    | `[BS]`    | `\b`   |
    | `[TAB]`   | `\t`   |
    | `[LF]`    | `\n`   |
    | `[VT]`    | `\v`   |
    | `[FF]`    | `\f`   |
    | `[CR]`    | `\r`   |
    | `[ESC]`   | `\e`   |
    
    ```bash
    $ printf "Test \0\r\n" | ninprint -f escape

    T e s t [SPACE] \0 \r \n
    ```

  * `octal-escape`:
  
    Print all characters using their octal escape sequence.
    
    ```bash
    $ printf "Test \0\r\n" | ninprint -f octal-escape

    \124 \145 \163 \164 \40 \0 \15 \12
    ```

  * `hex-escape`:
  
    Print all characters using their hexadecimal escape sequence.
    
    ```bash
    $ printf "Test \0\r\n" | ninprint -f hex-escape

    \x54 \x65 \x73 \x74 \x20 \x0 \xD \xA
    ```

  * `hex`:
  
    Print all characters in hexadecimal.
    
    ```bash
    $ printf "Test \0\r\n" | ninprint -f hex

    54 65 73 74 20 00 0D 0A
    ```

  * `octal`:
  
    Print all characters in octal.
    
    ```bash
    $ printf "Test \0\r\n" | ninprint -f octal

    124 145 163 164 040 000 015 012
    ```

  * `binary`:
  
    Print all characters in binary.
    
    ```bash
    $ printf "Test \0\r\n" | ninprint -f binary

    01010100 01100101 01110011 01110100 00100000 00000000 00001101 00001010
    ```

* `-s, --separator [value]`:
  
  Set the string that separates output values. Default is ' ' (space)

  ```bash
    $ printf "Test \0\r\n" | ninprint -s ...

    T...e...s...t...[SPACE]...[NUL]...[CR]...[LF]
  ```
  ```bash
    $ printf "Test \0\r\n" | ninprint -s $'\n'

    T
    e
    s
    t
    [SPACE]
    [NUL]
    [CR]
    [LF]
  ```

* `-S`:
  
  Don't separate output values (equivalent to -s '')

  ```bash
    $ printf "Test \0\r\n" | ninprint -S

    Test[SPACE][NUL][CR][LF]
  ```
  ```bash
    $ printf "Test \0\r\n" | ninprint -f escape -S

    Test[SPACE]\0\r\n
  ```
  ```bash
    $ printf "Test \0\r\n" | ninprint -f hex -S

    5465737420000D0A
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

## Options
`print` and `convert` both take an `options` object as a second parameter.
```javascript
const { print, convert, Format } = require("ninprint");

print("Test\0\r\n", {
  format: Format.DEFAULT,
  separator: " "
});

const test1 = convert("Test\0\r\n", {
  format: Format.ESCAPE,
  separator: ""
});
```

Possible options are:

* `format`:

  The output format. Possible format types are:

  * `Format.DEFAULT`
  * `Format.ESCAPE`
  * `Format.OCTAL_ESCAPE`
  * `Format.HEX_ESCAPE`
  * `Format.HEX`
  * `Format.OCTAL`
  * `Format.BINARY`

  Where: `{ Format } = require("ninprint")`

  See `format` in the [CLI options](#options) for explanations of each format type.

* `separator`:

  The string that separates output values. Default is " " (space)

  See `separator` in the [CLI options](#options) for examples.

# License
[MIT](LICENSE)
