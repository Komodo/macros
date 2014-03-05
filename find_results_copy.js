// XUL tree: https://developer.mozilla.org/en-US/docs/XUL/tree
var tree = ko.widgets.getWidget("findresults1_tabpanel").contentDocument.getElementById("findresults");
var text = "";
for (var row=0; row < tree.view.rowCount; row++) {
    for (var col=0; col < tree.columns.length; col++) {
        text += tree.view.getCellText(row, tree.columns[col]);
        if (col+1 < tree.columns.length) {
            text += ", ";
        }
    }
    text += "\n";
}
// Copy to the clipboard and add message it's done.
xtk.clipboard.setText(text);
ko.statusBar.AddMessage("Copied " + row + " find result rows to the clipboard");
