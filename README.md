# Komodo Macros

This is a collection of useful Komodo macros.

## Table of Contents

- [List of Macros](#macros)
    - [Wrap Text](#wrap-text)
    - [PHPDoc and JSDoc](#phpdoc-and-jsdoc)
    - [Incremental Numbering](#incremental-numbering)
    - [Copy Find Results](#copy-find-results)
    - [Automagic Snippets From Text](#automagic-snippets-from-text)
- [How to Install](#installing)
- [Contributing](#contributing)


## Macros

### Wrap Text

Wrap the editor selection with arbitrary text. Easily enclose text with HTML
tags or stringify a selection.

See the [code](text_wrapper.js).

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

### Copy Find Results

A macro that will copy the existing Find Results onto the clipboard. Note:
There can be two find results pane opened - this only works on the first one.

See the [code](find_results_copy.js).

### Automagic Snippets From Text

Create a snippet from selected text, add a name and automatically open properties
to add keybinding.

See the [code](automagic_snippets_from_text.js).

## Installing

Create a new macro in your Komodo toolbox and copy/paste the contents into the
Komodo macro editor.

## Contributing

Got a handy macro yourself? Please submit a pull request to have your macro
added to this list.
