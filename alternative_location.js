// Adds an editor tab context menuitem for opening a komodo file in
// an alternative location. The alternative locations are read from the
// "locations.ini" file in the Komodo profile directory.
//
// Example "locations.ini" config file:
//
// path1 = /home/toddw/src/checkout1/
// path2 = /home/toddw/alt/checkout2/
// 
// Given the above configuration, if I had this file open in Komodo:
//   /home/toddw/src/checkout1/libs/entry1.py
// I could right click on the tab, choose "Open at location > path2",
// and Komodo would try to open this file:
//   /home/toddw/alt/checkout2/libs/entry1.py
//

if (typeof(window.extensions) == 'undefined') {
    window.extensions = {};
}
if (typeof(extensions.locations) == 'undefined') {
    extensions.locations = {};
}

extensions.locations.paths = [];

extensions.locations.editConfigFile = function() {
    var koDirs = Components.classes["@activestate.com/koDirs;1"].getService(Components.interfaces.koIDirs);
    var koOs = Components.classes["@activestate.com/koOs;1"].getService(Components.interfaces.koIOs);
    var configpath = [koDirs.userDataDir, "locations.ini"].join(koOs.sep);
    ko.open.URI(configpath);
}

extensions.locations.openAtIndex = function(idx) {
    var view = ko.views.manager.currentView;
    var file = view.koDoc.file;
    var fpath = file.path;
    // Find out what configuration it's coming from.
    var prefix = "";
    for (var i=0; i < extensions.locations.paths.length; i++) {
        var trypath = extensions.locations.paths[i];
        // Prefer the longest config path.
        if (fpath.startsWith(trypath) && prefix.length < trypath.length) {
            prefix = trypath;
            break;
        }
    }
    if (!prefix) {
        ko.dialogs.alert("This file is not a descendant of any directory in the config file");
        return;
    }
    // Open at the alternative location.
    var scimoz = view.scimoz;
    var lineno = scimoz.lineFromPosition(scimoz.currentPos) + 1;
    var osPathSvc = Components.classes["@activestate.com/koOsPath;1"].getService(Components.interfaces.koIOsPath);
    var path = extensions.locations.paths[idx];
    var rel_path = fpath.substr(prefix.length);
    var path = osPathSvc.join(path, rel_path);
    ko.views.manager.doFileOpenAtLineAsync(path, lineno);
}

// Creating the UI.
function createXULElement(tagName, attributes) {
    var elem = document.createElement(tagName);
    var attr;
    for (attr in attributes) {
        elem.setAttribute(attr, attributes[attr]);
    }
    return elem;
}

extensions.locations.reloadConfiguration = function() {
    var koDirs = Components.classes["@activestate.com/koDirs;1"].getService(Components.interfaces.koIDirs);
    var koOs = Components.classes["@activestate.com/koOs;1"].getService(Components.interfaces.koIOs);
    var configpath = [koDirs.userDataDir, "locations.ini"].join(koOs.sep);

    var menupopup = document.getElementById("openKomodoLocationMenupopup");
    if (!menupopup) {
        // Create the menu.
        var menu = createXULElement("menu", {
            "id": "openKomodoLocationMenu",
            "label": "Open at location"
        });
        var menupopup = createXULElement("menupopup", {
            "id": "openKomodoLocationMenupopup"
        });
        menu.appendChild(menupopup);
        var tabContextMenu = document.getElementById("tabContextMenu");
        tabContextMenu.insertBefore(menu, document.getElementById("menu_splittab"));
    } else {
        // Remove all existing openAt menu entries.
        while (menupopup.firstChild) {
            menupopup.removeChild(menupopup.firstChild);
        }
    }
    
    // Load the config file and read all the entries.
    var kofile = Components.classes["@activestate.com/koFileEx;1"].createInstance(Components.interfaces.koIFileEx);
    kofile.URI = ko.uriparse.pathToURI(configpath);
    if (!koOs.path.exists(configpath)) {
        // Create a template one.
        var template = "# Kobranch configuration file\n" +
                       "#\n" +
                       "# Format of entries is: <name> = <path>\n" +
                       "#\n" +
                       "# Examples:\n" +
                       "#    foo   = /home/toddw/src/branch2/src\n" +
                       "#    zoink = C:\path\to\code\directory\n" +
                       "#\n" +
                       "";
        kofile.open("w");
        kofile.puts(template);
        kofile.close();
    }
    kofile.open("r");
    var contents = kofile.readfile();
    kofile.close();
    // Parse the entries: "name = /absolute/path/to/dir"
    var lines = contents.split("\n");
    var match;
    var menuitem = null;
    for (var i=0; i < lines.length; i++) {
        match = lines[i].match(/^(.*?)\s*=\s*(.*)$/);
        if (match && match[1][0] != "#") {
            var branchdir = koOs.path.expanduser(match[2]);
            // Add directory separator on the end.
            if (!branchdir.substr(-1) != koOs.sep) {
                branchdir += koOs.sep;
            }
            if (extensions.locations.paths.indexOf(branchdir) >= 0) {
                continue; // That path already exists.
            }
            menuitem = createXULElement("menuitem", {
                "id": "openKomodoLocationMenuitem_" + match[1],
                "label": match[1],
                "oncommand": "extensions.locations.openAtIndex(" + extensions.locations.paths.length + ")"
            });
            menupopup.appendChild(menuitem);
            extensions.locations.paths.push(branchdir);
        }
    }
    if (menuitem) {
        // Items for found - add a separator.
        menupopup.appendChild(createXULElement("menuseparator"));
    }
    // Create menuitem to access the config file.
    menuitem = createXULElement("menuitem", {
        "id": "openKomodoLocationMenuitem_editfile",
        "label": "Edit configuration file",
        "oncommand": "extensions.locations.editConfigFile()"
    });
    menupopup.appendChild(menuitem);
    // Create config reload menuitem.
    menuitem = createXULElement("menuitem", {
        "id": "openKomodoLocationMenuitem_editfile",
        "label": "Reload configuration",
        "oncommand": "extensions.locations.reloadConfiguration()"
    });
    menupopup.appendChild(menuitem);
}

// Load for the first time.
extensions.locations.reloadConfiguration();
