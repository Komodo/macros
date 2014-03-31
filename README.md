# Komodo Macros

This is a collection of useful Komodo macros.

## Table of Contents

- [List of Macros](#macros)
    - [Wrap Text](#wrap-text-code)
    - [PHPDoc and JSDoc](#phpdoc-and-jsdoc-code)
    - [Incremental Numbering](#incremental-numbering-code)
    - [Copy Find Results](#copy-find-results-code)
    - [Variable Dumper](#variable-dumper-code)
    - [Automagic Snippets From Text](#automagic-snippets-from-text-code)
    - [Reorder lines as tower](#reorder-lines-as-tower-code)
    - [Left pare](#left-pare-code)
    - [Byte or Char Position](#Byte-or-char-position-code)
- [How to Install](#installing)
- [Contributing](#contributing)


## Macros

### Wrap Text ([code](text_wrapper.js))

Wrap the editor selection with arbitrary text. Easily enclose text with HTML
tags or stringify a selection.

### PHPDoc and JSDoc ([code](phpdoc_jsdoc_autocompletion.js))

Automatically adds PHPdoc (or JSDoc) comments, including a summary, to your PHP
(or JavaScript) file when you type '/**' followed by the ENTER key.

If the line below the current position is a function, variable or class it will
check for an toolbox Abbreviation and add it's contents to the phpdoc comment.

### Incremental Numbering ([code](column_incremental_numbering.js))

Make a column selection in the editor, then for each column insert a number and
have the number incremented for each subsequent row in the selection.

### Copy Find Results ([code](find_results_copy.js))

A macro that will copy the existing Find Results onto the clipboard. Note:
There can be two find results pane opened - this only works on the first one.

### Variable Dumper ([code](variable_dumper.js))

Debug helper - generates a print statement from the current word or selection.

### Automagic Snippets From Text ([code](automagic_snippets_from_text.js))

Create a snippet from selected text, add a name and automatically open properties
to add keybinding.

### Reorder lines as tower ([code](Reflow_tower.py))

Reorder selected lines, so that the shortest will go to top and the longest goes to bottom. Useful when reordering "import" lines in Python source code.

### Left pare ([code](Left_pare.py))

Remove 1 character form selected line on the left. Useful to clean code copied from _diff_ file.

### Byte or Char Position([code](add_byte_char_pos_statusbar.js))

Show the Byte or Char position of your cursor in the Statusbar beside Ln and Col.

## Installing

Create a new macro in your Komodo toolbox and copy/paste the contents into the
Komodo macro editor.

## Contributing

Got a handy macro yourself? Please submit a pull request to have your macro
added to this list.
