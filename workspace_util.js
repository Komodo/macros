/**
 * Save workspace (all open files) to a file.  Does not have a project context,
 * it simply saves all files that are open for easy reopning later.
 *
 * Type:  On Demand
 *
 * @source        https://github.com/Komodo/macros
 * @author        Carey Hoffman
 * @version       0.1
 */

if (typeof(ko.extensions) == "undefined") {
    ko.extensions = {}
}
ko.extensions.workspace = {};

workLog = ko.logging.getLogger("Workspace");

/**
 * Collect path to all open files
 * @returns (Array) all open file paths
 */
ko.extensions.workspace.collectOpenViewPaths = function(){
    var curPaths = [];
    var curViews = ko.views.manager.getAllViews();
    for (var i = 0; i < curViews.length; i++){
        try{
            var viewPath = curViews[i].koDoc.file.path;
        } catch (TypeError) {
            //workLog.warn(e, "'No koDoc': Could not load file path.")
            // Might as well skip this loop with no file path
            continue;
        }
        // Don't need the start page to reload
        if (viewPath.contains("startpage")){
            continue;
        }
        curPaths.push(viewPath);
    }
    return curPaths;
}

/**
 * Open dialog to allow user to pick location to save workspace file
 * @returns {String} path to save location
 */
ko.extensions.workspace.pickSpaceSavePath = function(){
    var prevSaveFile = ko.extensions.workspace.lastSavedWorkspace;
    var fileSvc = Components.classes["@activestate.com/koFileService;1"]
            .getService(Components.interfaces.koIFileService)
    var defaultName = null;
    var defaultDir = null;
    if (typeof(prevSaveFile) != "undefined"){
        alert(prevSaveFile);
        // convert the path string into a file object, get dirname and basename
        file = fileSvc.getFileFromURI(prevSaveFile);
        defaultName = file.baseName;
        defaultDir = file.dirName;
    } else {
        defaultDir = this.getDefaultDir();  
    }
    if (defaultName == null) {
        defaultName = "MySpace.komodospace";
    }
    var saveFilePath = ko.filepicker.saveFile(defaultDir,
                                           defaultName,
                                           "Save Workspace..."
                                           //["Workspace"] // I doubt it's this easy to show only *.workspace files.
                                           )
    return saveFilePath;
}

/**
 * Create file at user specified location with all currentView paths
 */
ko.extensions.workspace.save = function (filepath){
    if (!filepath) {
        filepath = this.pickSpaceSavePath();
        if (filepath == null) {
            return;
        }   
    }
    var workspace = this.collectOpenViewPaths();
    var fileEx = Components.classes["@activestate.com/koFileEx;1"]
                .createInstance(Components.interfaces.koIFileEx);
    fileEx.URI = filepath;
    fileEx.open('w');
    fileEx.puts(JSON.stringify(workspace));
    fileEx.close();
    // Set filepath as prop to use during later Saves.
    ko.extensions.workspace.lastSavedWorkspace = filepath;
}

/**
 * Open a ko.filepicker to grab the workspace file the user wants to open
 * @returns {String} file path to workspace file
 */
ko.extensions.workspace.pickSpaceFileToOpen = function () {
    var defaultDir; 
    defaultDir = this.getDefaultDir();
    var spaceFile = ko.filepicker.openFile(defaultDir,
                                           null, //don't want a default name
                                           "Choose workspace file"
                                           //"komodospace"  // Not as easy as I
                                                            // thought.  
                                           //["komodospace",["*.komodospace"]]
                                           )
    return spaceFile;
}

/**
 * Try to guess a default path to open to, return null otherwise
 * @returns {String} string of path to use as default save/open location
 */
ko.extensions.workspace.getDefaultDir = function() {
    var defaultDir = null;
    var project = ko.projects.manager.currentProject;
    var koDoc =  ko.views.manager.currentView.koDoc;
    if (project) {
        defaultDir = project.liveDirectory;
    }
    else if(koDoc){
        defaultDir = koDoc.file.dirName;
    }
    return defaultDir;
}

/**
 * Load *.komodospace file, convert to list of paths
 * @argument {String} path to workspace file
 * @returns {JSON Array} List of paths to files in saved workspace
 */
ko.extensions.workspace.loadWorkspaceFile =  function(filepath){
    if (!filepath) {
        filepath = this.pickSpaceFileToOpen();
    }
    if (filepath.endsWith(".komodospace")) {
        var fileSvc = Components.classes["@activestate.com/koFileService;1"]
                        .getService(Components.interfaces.koIFileService)
        spaceFile = fileSvc.getFileFromURI(filepath);
        try{
            spaceFile.open("r");
            fileContents = spaceFile.readfile();
            // JSON stringify for easier parsing later
            fileContents = JSON.parse(fileContents);
        } finally {
            spaceFile.close();
        }
    } else {
        alert("Choose a *.komodospace file.");
        return null;
    }
    return fileContents;
}

/**
 * Take a list of URIs and load the files into Komodo based on those paths.
 * @argument {Array} list of file paths
 */
ko.extensions.workspace.open = function(filepath){
    var jsonPaths = this.loadWorkspaceFile(filepath);
    if (jsonPaths ==  null) {
        // didn't get a file for some reason, might as well bail.
        return;
    }
    try{
        ko.open.multipleURIs(jsonPaths);
    } catch(e){
        workLog.warn("Could load file from workspace file:  ERROR: ", e)
    }
    ko.statusBar.AddMessage("Loaded Workspace.  You're welcome :|");
}

ko.extensions.workspace.injectDOM = function(){
    var menuAtts = {id:"menu_workspace_tools_macro",
                    accesskey:"W",
                    label:"Workspace"};
    
    var workspacePopup = {id:"menu_workspace_popup"}
    
    var openItem = {id:"menu_workspace_open_item",
                    accesskey:"O",
                    label:"Open Workspace",
                    oncommand:"ko.extensions.workspace.open()"};
                        
    var saveItem = {id:"menu_workspace_save_item",
                    accesskey:"S",
                    label:"Save Workspace",
                    oncommand:"ko.extensions.workspace.save()"};
                            
    var toolsmenu = document.getElementById("popup_tools");
    var spacemenu = xtk.domutils.newElement("menu", menuAtts);
    var spacepop = xtk.domutils.newElement("menupopup", workspacePopup);
    var openmenuitem = xtk.domutils.newElement("menuitem", openItem);
    var savemenuitem = xtk.domutils.newElement("menuitem", saveItem);
    spacepop.appendChild(openmenuitem);
    spacepop.appendChild(savemenuitem);
    spacemenu.appendChild(spacepop);
    toolsmenu.appendChild(spacemenu);
}

ko.extensions.workspace.injectDOM();