# Komodo Macros

This is a collection of useful Komodo macros.

## Table of Contents

- [List of Macros](#macros)
    - [PHPDoc and JSDoc](#phpdoc-and-jsdoc)
    - [Incremental Numbering](#incremental-numbering)
- [How to Install](#installing)
- [Contributing](#contributing)


## Macros

### PHPDoc and JSDoc

Automatically adds PHPdoc (or JSDoc) comments, including a summary, to your PHP
(or JavaScript) file when you type '/**' followed by the ENTER key.

If the line below the current position is a function, variable or class it will
check for an toolbox Abbreviation and add it's contents to the phpdoc comment.

See the [code](phpdoc_jsdoc_autocompletion.js).

### Incremental Numbering

Make a column selection in the editor, then for each column insert a number and
have the number incremented for each subsequent row in the selection.

See the [code](column_incremental_numbering.js).

## Installing

Create a new macro in your Komodo toolbox and copy/paste the contents into the
Komodo macro editor.

## Contributing

Got a handy macro yourself? Please submit a pull request to have your macro
added to this list.
