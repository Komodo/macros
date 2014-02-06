/**
 * Make a column selection in the editor, then for each column insert a number
 * and have the number incremented for each subsequent row in the selection.
 *
 * A popup UI allows control of the starting number and the increment size.
 *
 * Type:  Startup
 * Usage: "Tools > Insert Column Numbers" menu
 *
 * @source        https://github.com/Komodo/macros
 * @author        Todd Whiteman
 * @version       0.1
 */

// Create a namespace to attach our functions too.
if (!window.extensions) {
    extensions = {};
}
if (!extensions.columnnumber) {
    extensions.columnnumber = {};
}

// Function that performs the column number insertion.
extensions.columnnumber.doEditorInsertion = function(startNum, incNum, padChar=" ") {
    var scimoz = ko.views.manager.currentView.scimoz;
    var ranges = [];
    var numSelections = scimoz.selections;
    // Determine the maximum padding that will be needed.
    var lastNum = startNum + ((numSelections - 1) * incNum);
    var padWidth = lastNum.toString().length;
    // Store the selection positions.
    var selection_points = [];
    for (var i=0; i < numSelections; i++) {
        selection_points.push([scimoz.getSelectionNStart(i),
                               scimoz.getSelectionNEnd(i),
                               i]);
    }
    // Selections are unsorted - so sort them by their document position.
    selection_points.sort(function(left, right) { return left[0] - right[0]});

    // Begin the editing, starting from the last selection position.
    scimoz.beginUndoAction();
    try {
        var currentNum = lastNum;
        var selNo, start, end;
        var entry, virtual_space;
        for (var i = numSelections-1; i >= 0; i--) {
            [start, end, selNo] = selection_points[i];
            entry = ko.stringutils.padLeft(currentNum.toString(), padWidth, padChar);
            // Calculate any virtual whitespace
            virtual_space = Math.max(scimoz.getSelectionNCaretVirtualSpace(selNo),
                                     scimoz.getSelectionNAnchorVirtualSpace(selNo));
            if (virtual_space) {
                entry = ko.stringutils.padLeft("", virtual_space, " ") + entry;
            }
            // Replace the selection.
            scimoz.targetStart = start;
            scimoz.targetEnd = end;
            scimoz.replaceTarget(entry.length, entry);
            scimoz.setSelectionNStart(selNo, start + entry.length);
            scimoz.setSelectionNEnd(selNo, start + entry.length);
            // Calculate the next number to insert.
            currentNum -= incNum;
        }
    } finally {
        scimoz.endUndoAction();
    }
}

// Helper function to create DOM elements.
var $create = function(parent, elemtype, attributes) {
    var elem = document.createElement(elemtype);
    if (attributes) {
        for (var name of Object.keys(attributes)) {
            elem.setAttribute(name, attributes[name]);
        }
    }
    if (parent) {
        parent.appendChild(elem);
    }
    return elem;
};

var CreateInsertNumbersUI = function() {
    var panel = document.getElementById("column_number_popup");
    // Only need to create one of these, else we re-use the existing one.
    if (!panel) {
        //
        // UI elements used:
        //   panel    https://developer.mozilla.org/en-US/docs/XUL/panel
        //   vbox     https://developer.mozilla.org/en-US/docs/XUL/vbox
        //   hbox     https://developer.mozilla.org/en-US/docs/XUL/hbox
        //   label    https://developer.mozilla.org/en-US/docs/XUL/label
        //   textbox  https://developer.mozilla.org/en-US/docs/XUL/textbox
        //   button   https://developer.mozilla.org/en-US/docs/XUL/button
        //
        // Full a full list, see:
        //            https://developer.mozilla.org/en-US/docs/XUL/XUL_controls
        //
        panel = $create(document.documentElement, "panel",
                        {id: "column_number_popup",
                         // Focus on the textbox when opened.
                         onpopupshown: "document.getElementById('column_number_textbox1').focus();"});
        var vbox = $create(panel, "vbox");

        var hbox1 = $create(vbox, "hbox");
        var label1 = $create(hbox1, "label", {value: "Start number: "});
        var textbox1 = $create(hbox1, "textbox",
                               {id: "column_number_textbox1",
                                type: "number",
                                cols: "5",
                                size: "5",
                                clickSelectsAll: "true",
                                value: "1"});

        var hbox2 = $create(vbox, "hbox");
        var label2 = $create(hbox2, "label", {value: "Increment by: "});
        var textbox2 = $create(hbox2, "textbox",
                               {id: "column_number_textbox2",
                                type: "number",
                                cols: "5",
                                size: "5",
                                clickSelectsAll: "true",
                                value: "1"});

        var hbox3 = $create(vbox, "hbox");
        var okbutton = $create(hbox3, "button", {label: "OK"});
        var onCommandCallback = function(e) {
            // This event has been handled.
            e.preventDefault();
            e.stopPropagation();
            // Retrieve the values.
            var startNum = parseInt(document.getElementById("column_number_textbox1").value);
            var incNum = parseInt(document.getElementById("column_number_textbox2").value);
            panel.hidePopup();
            // Perform the editor insertion.
            extensions.columnnumber.doEditorInsertion(startNum, incNum);
        }
        var onTextboxKeypress = function(e) {
            // Look for an enter (return) keypress.
            if (e.keyCode == e.DOM_VK_RETURN) {
                onCommandCallback(e);
            }
        }
        // Hook up ENTER keypress and button click interactions.
        textbox1.addEventListener("keypress", onTextboxKeypress, true);
        textbox2.addEventListener("keypress", onTextboxKeypress, true);
        okbutton.addEventListener("command", onCommandCallback, true);
    }
    return panel;
}

extensions.columnnumber.showInsertColumnNumbers = function() {
    // Create the insertion UI.
    var panel = CreateInsertNumbersUI();
    // Show the UI, which will also handle all user interactions.
    var view = ko.views.manager.currentView;
    var scimoz = view.scimoz;
    if (!scimoz) {
        return;
    }
    var x = scimoz.pointXFromPosition(scimoz.currentPos);
    var y = scimoz.pointYFromPosition(scimoz.currentPos);
    panel.openPopup(view, "after_pointer", x, y, false, false);
}

// Add a "Tools > Insert Column Numbers" menu item.
//   menuitem    https://developer.mozilla.org/en-US/docs/XUL/menuitem
var toolsMenuPopup = document.getElementById("popup_tools");
var menuitem = $create(null, "menuitem",
                       {id: "column_number_menuitem",
                        label: "Insert Column Numbers",
                        oncommand: "extensions.columnnumber.showInsertColumnNumbers();"});
toolsMenuPopup.appendChild(menuitem);
// We could also add it at a specific menu position too - e.g. after separator:
//toolsMenuPopup.insertBefore(menuitem, document.getElementById("menu_tools_separator").nextSibling);
