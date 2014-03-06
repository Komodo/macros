// Create a base snippet with the selected text
scimoz = ko.views.manager.currentView.scimoz;
var snip =
   ko.projects.addSnippetFromText(scimoz.selText);
//create a date to be used as a unique name on the snippet
var d = new  Date();
// Create a unique default name string
var defaultName = "New Snippet - " + d.toLocaleTimeString().substr(0,8).trim()
// Ask for a name or provide the unique default
var name = ko.interpolate.interpolateStrings("%(ask:Snippet Name: " +
                                             defaultName + ")")
// Assign the name to the snippet name attribute
snip.name = name;
// Open the snippet options to set a keybinding
ko.projects.snippetProperties(snip);