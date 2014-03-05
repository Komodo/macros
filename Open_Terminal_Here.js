/**
 * Adds an "Open Terminal Here" menu item to folder items in the Places widget
 *
 * @source https://github.com/Komodo/macros
 * @author Nathan Rijksen
 * @version 0.1
 */

if ((typeof extensions) == 'undefined')
{
    extensions = {};
}

extensions.OpenTerminalHere = {};

(function()
 {

    var d = document.getElementById('placesViewbox').contentDocument;
    var mi = d.getElementById('contextOpenTerminalHere');

    if (mi) mi.parentNode.removeChild(mi);

    var d = document.getElementById('placesViewbox').contentDocument;
    var sibling = d.getElementById('placesContextMenu_showInFinder');

    mi = document.createElement("menuitem");
    mi.setAttribute("id", "contextOpenTerminalHere");
    mi.setAttribute("hideIf", "file project");
    mi.setAttribute("label", "Open Terminal Here");

    mi.addEventListener('command', function(e)
    {
        uris = ko.places.viewMgr.getSelectedURIs()
        if ( ! uris.length) return;
        path = uris[0].replace(/^[a-zA-Z]+:\/\//,'');

        ko.run.runCommand(window, 'osascript -e \'tell application "terminal"\' -e \'do script "cd \\"' + path + '\\""\' -e \'activate\' -e \'end tell\'', {env: null}, null, null, null, true, 'no-console');
    });

    sibling.parentNode.insertBefore(mi, sibling.nextSibling);

}).apply(extensions.OpenTerminalHere);
