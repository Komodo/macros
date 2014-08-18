/**
 * This is best used as a Komodo Startup macro which adds this functionality to
 * the existing Komodo code.  Print text to Komodo output pane.
 *
 * Type:  On Demand
 *
 * @source        https://github.com/Komodo/macros
 * @author        Eric Promislow, Carey Hoffman
 * @version       0.2
 */

// Don't make this var, or it won't be visible afterwards.
print_to_output_tab = function(str) {
    try {
        // Uncomment to allow for prompting of input text
        //if (!str) {
        //    str  = prompt("What text do you want to input?");
        //}
        // Make sure the command output window is visible
        ko.run.output.show(window, false);
        // Retrieve the run output widget document element
        var runWidgetDoc = ko.widgets.getWidget("runoutput-desc-tabpanel").contentDocument;
        // Make sure we're showing the output pane, not the error list pane.
        var deckWidget = runWidgetDoc.getElementById("runoutput-deck");
        if (deckWidget.getAttribute("selectedIndex") != 0) {
            ko.run.output.toggleView();
        }
        // Now find out which newline sequence the window uses, and write the
        // text to it.
        var scimoz = runWidgetDoc.getElementById("runoutput-scintilla").scimoz;
        var prevLength = scimoz.length;
        var currNL = ["\r\n", "\n", "\r"][scimoz.eOLMode];
        var full_str = str + currNL;
        var full_str_byte_length = ko.stringutils.bytelength(full_str);
        var ro = scimoz.readOnly;
        try {
            scimoz.readOnly = false;
            scimoz.appendText(full_str_byte_length, full_str);
        } finally {
            scimoz.readOnly = ro;
        }
        // Bring the new text into view.
        scimoz.gotoPos(prevLength + 1);
    } catch(ex) {
        alert("problems printing [" + str + "]:" + ex + "\n");
    }
};
//uncomment to allow execution of macro outside the JS developer shell
//print_to_output_tab();