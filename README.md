# Komodo Macros

This is a collection of useful Komodo macros.

## Table of Contents

- [List of Macros](#macros)
    - [Wrap Text](#wrap-text-code)
    - [PHPDoc and JSDoc](#phpdoc-and-jsdoc-code)
    - [Incremental Numbering](#incremental-numbering-code)
    - [Copy Find Results](#copy-find-results-code)
    - [Multi Row Editor Tabs](#multi-row-editor-tabs-code)
    - [Variable Dumper](#variable-dumper-code)
    - [Swap Assignment](#swap-assignment-code)
    - [SCC Annotate](#scc-annotate-code)
    - [Automagic Snippets From Text](#automagic-snippets-from-text-code)
    - [Reorder lines as tower](#reorder-lines-as-tower-code)
    - [Left pare](#left-pare-code)
    - [Brace Wrap Selection](#brace-wrap-selection-code)
    - [Byte or Char Position](#byte-or-char-position-code)
    - [Img Tag Dimensions](#img-tag-dimensions-code)
    - [Alternative Location](#alternative-location-code)
    - [Comment Toggle](#comment-toggle-code)

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

A macro that will copy the existing Find Results onto the clipboard. Note: There
can be two find results pane opened - this only works on the first one.

### Multi Row Editor Tabs ([code](editor_tabs_multiple_rows.js.js))

Allow multiple rows of editor tabs. When there is not enough room for all tabs
in a single row, the tabs will wrap around onto a new tab row.

### Variable Dumper ([code](variable_dumper.js))

Debug helper - generates a print statement from the current word or selection.

### Swap Assignment ([code](swap_assignment.py))

Switch a variable assignment (or argument) around, so *foo = bar* will become
*bar = foo*.

### SCC Annotate ([code](scc_annotate.js))

Display source code control (SCC) line annotations in the left editor margin.

### Automagic Snippets From Text ([code](automagic_snippets_from_text.js))

Create a snippet from selected text, add a name and automatically open
properties to add keybinding.

### Reorder lines as tower ([code](Reflow_tower.py))

Reorder selected lines, so that the shortest will go to top and the longest goes
to bottom. Useful when reordering "import" lines in Python source code.

### Left pare ([code](Left_pare.py))

Remove 1 character form selected line on the left. Useful to clean code copied
from _diff_ file.

### Brace Wrap Selection ([code](brace_wrap_selection.js))

With an editor selection, pressing any of [{("\' keys will place matching braces
or quotes around the selected text. Differs from [Wrap Text](#wrap-text-code)
because this is a startup macro, and doesn't need to be invoked each time.

### Byte or Char Position ([code](add_byte_char_pos_statusbar.js))

Show the Byte or Char position of your cursor in the Statusbar beside Ln and
Col.

### Img Tag Dimensions ([code](img_dimensions.js))

Execute the macro insdie an img tag in an html file, which the src attribute
filled in.  The macro will load the image and input the height and width of
the image attributes with the correct dimensions

### Alternative Location ([code](alternative_location.js))

Adds an editor tab context menuitem for opening a komodo file in an alternative
location. The alternative locations are read from a *locations.ini*
configuration file in the Komodo profile directory.

### Comment Toggle ([code](comment_toggle.py))

Toggles comments (on or off) over the selected lines (or current line) of the
editor.


## Installing

Create a new macro in your Komodo toolbox and copy/paste the contents into the
Komodo macro editor.

## Contributing

Got a handy macro yourself? Please submit a pull request to have your macro
added to this list.
