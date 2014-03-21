/**
 * Generates a print/debugging statement for the selection, or current word.
 * The generated statement is always created on a separate new line below the
 * current line.
 *
 * This is an on demand macro, best used with a keybinding (Ctrl+. for example).
 *
 * Type:  On Demand
 *
 * @source        https://github.com/Komodo/macros
 * @author        Todd Whiteman
 * @version       0.5
 */

var view = ko.views.manager.currentView;
var editor = view.scimoz;

ko.views.manager.currentView

// Use the current word under the cursor when no selection exists.
var code = editor.selText;
if (!code) {
    var currentPos = editor.currentPos;
    var start = editor.wordStartPosition(currentPos, true);
    var end = editor.wordEndPosition(currentPos, true);
    // Continue collecting words whilst the separator char is one of these:
    var continueChars = "->.";
    var prevChar = String.fromCharCode(editor.getCharAt(editor.positionBefore(start)));
    while (start > 0 && continueChars.indexOf(prevChar) >= 0) {
        start = editor.wordStartPosition(editor.positionBefore(start), true);
        prevChar = String.fromCharCode(editor.getCharAt(editor.positionBefore(start)));
    }
    code = editor.getTextRange(start, end);
}

// Now create a print statement for the current language.
var resultingText = "";
var language = view.koDoc.language;
switch (language) {
    case "Python":
        if (!code)
            resultingText = "print()";
        else
            resultingText = "print('" + code + ": %r' % (" + code + ", ))";
        break;
    case "PHP":
        if (!code)
            resultingText = "print_r('\\n');";
        else
            resultingText = "print_r('" + code + ": '); var_dump(" + code + ");";
        break;
    case "JavaScript":
    case "HTML":
    case "Markdown":
        if (!code)
            resultingText = "console.log('');";
        else
            resultingText = "console.log('" + code + ": ', " + code + ");";
        break;
    case "C++":
        if (!code)
            resultingText = 'printf("\\n");';
        else
            resultingText = 'printf("' + code + ': %s\\n", ' + code + ");";
        break;
    case "Bash":
        if (!code)
            resultingText = "echo";
        else
            resultingText = 'echo "' + code + ': $' + code + '"';
        break;
    default:
        if (code)
            resultingText = 'print "' + code + ': "' + code;
        break;
}

// Insert the generated statement.
editor.beginUndoAction();
try {

    ko.commands.doCommand("cmd_end");
    ko.commands.doCommand("cmd_newline");
    editor.insertText(editor.currentPos, resultingText);
} finally {
    editor.endUndoAction();
}
