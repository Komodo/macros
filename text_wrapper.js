/**
 * Execute the macro and then just start typing the wrapper name.
 *
 * This is an on demand macro that will wrap the selected editor text with
 * arbitrary text. For HTML or XML, it will also add the opening/closing tags.
 *
 * Type:  On Demand
 *
 * @source        https://github.com/Komodo/macros
 * @author        Todd Whiteman
 * @version       0.2
 */

var view = ko.views.manager.currentView;
var scimoz = view.scimoz;
var currentWord = ko.interpolate.getWordUnderCursor(scimoz);
if (currentWord) {
    // Create a fake snippet, that will hold the two editing positions.
    var snippetText = '[[%tabstop1:"]][[%w]][[%tabstop1]]';
    var langName = view.languageObj.name.toLowerCase();
    if (langName.indexOf("html") >= 0 ||
        langName.indexOf("xml") >= 0) {
        // For HTML, add tags around the text.
        snippetText = '<[[%tabstop1:div]]>[[%w]]</[[%tabstop1]]>';
    }
    var fakeSnippet = {
            hasAttribute: function(name) {
                    return name in this;
            },
            getStringAttribute: function(name) {
                    return this[name];
            },
            name: "autowrap snippet",
            indent_relative: "true",
            value: snippetText
    };
    ko.projects.snippetInsert(fakeSnippet);
} else {
    ko.statusBar.AddMessage("Nothing under the cursor to wrap.", "editor", 5000, true);
}
