/**
 * Adds an "Open Terminal Here" menu item to folder items in the Places widget
 *
 * @source https://github.com/Komodo/macros
 * @author Nathan Rijksen
 * @contributor Mathieu Strauch
 * @version 0.3
 */

// Register namespace
if ((typeof extensions) == 'undefined') extensions = {};
extensions.OpenTerminalHere = {};

(function()
 {

    // Get places pane document object
    var d = document.getElementById('placesViewbox').contentDocument;

    // Remove existing menu entry if it exists
    var mi = d.getElementById('contextOpenTerminalHere');
    if (mi) mi.parentNode.removeChild(mi);

    // Get the sibling element which we want to insert our menu item after
    var sibling = d.getElementById('placesContextMenu_rename');
    
    var platform = navigator.platform.toLowerCase();

    // Create our menu item
    mi = document.createElement("menuitem");
    mi.setAttribute("id", "contextOpenTerminalHere");
    mi.setAttribute("hideIf", "file project");
    mi.setAttribute("label", "Open Terminal Here");

    // Add event listener for when the menu item is used
    mi.addEventListener('command', function(e)
    {
        uris = ko.places.viewMgr.getSelectedURIs()
        if ( ! uris.length) return;
        path = uris[0].replace(/^[a-zA-Z]+:\/\//,'');

        // Prepare command for each platform
        var command;
        if (platform.indexOf("mac") != -1) // Mac / OSX -- terminal
            command = 'osascript -e \'tell application "terminal"\' -e \'do script \
                      "cd \\"' + path + '\\""\' -e \'activate\' -e \'end tell\'';
        else if (platform.indexOf("linux") != -1) // Linux -- gnome-terminal
            command = 'gnome-terminal --working-directory="' + path + '"';
        else if (platform.indexOf("win") != -1) // Windows -- command prompt
        {
            path = path.replace(/^(?:[a-z]*:\/\/|\/)/i,'');
            command = 'start cmd /K "cd ' + path + '"';
        }

        // Run command, dont show output window
        ko.run.runCommand(window, command, {env: null}, null, null, null, true, 'no-console');
    });

    // Append menu item to popupmenu
    sibling.parentNode.insertBefore(mi, sibling);

}).apply(extensions.OpenTerminalHere);
