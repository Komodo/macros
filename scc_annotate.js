/**
 * Macro to show source code control annotate information in the left scintilla
 * margin.
 *
 * Currently supports Git and Subversion.
 * 
 * Type:  On-demand
 *
 * Usage: Run the macro on a file that is under scc control to see annotations,
 *        run it again to hide the annotations.
 *
 * @source        https://github.com/Komodo/macros
 * @author        Todd Whiteman
 * @version       0.3
 */

// Scintilla margin parameters.
const MARGIN_WIDTH = 200; // pixels wide
const MARGIN = 4;         // The unused scintilla margin.

var log = ko.logging.getLogger("macro.annotate");
//log.setLevel(ko.logging.LOG_DEBUG);

/**
 * Parse git annotate line, return array of annotate entries [date, author, rev]
 */
var GitAnnotateParser = function(stdout) {
    var lines = stdout.split("\n");
    var line_split;
    var revision, date, author;
    var result = [];
    for (var lineno=0; lineno < lines.length; lineno++) {
        line_split = lines[lineno].match(/\s*(\w+).*?\((.*?)([-\d]+).*?\).*/);
        if (!line_split) {
            result.push("");
            continue;
        }
        revision = line_split[1];
        author = line_split[2];
        date = line_split[3];
        if (date && author) {
            result.push([date, author]);
        } else {
            result.push("");
        }
    }
    return result;
}

/**
 * Parse svn annotate line, return array of annotate entries [date, author, rev]
 */
var SvnAnnotateParser = function(stdout) {
    var lines = stdout.split("\n");
    var line_split;
    var revision, author, date;
    var result = [];
    for (var lineno=0; lineno < lines.length; lineno++) {
        line_split = lines[lineno].split(/\s+/, 4);
        if (!line_split[0]) {
            line_split = line_split.slice(1);
        }
        revision = line_split[0];
        author = line_split[1];
        date = line_split[2];
        if (revision && author && date) {
            result.push([date, author, revision]);
        }
    }
    return result;
}

/**
 * Fetch annotate lines for the given file.
 */
var FetchAnnotationLines = function(koFileEx) {
    log.debug("FetchAnnotationLines for file " + koFileEx.path);
    if (!koFileEx.isLocal || !koFileEx.isFile) {
        throw new Exception("Annotate only works on local files");
    }
    var sccType = koFileEx.sccType;
    if (!sccType) {
        throw new Exception("Annotate only works on files under scc control");
    }
    if (sccType != "svn" && sccType != "git") {
        throw new Exception("Annotate only works for Git or Subversion repositories");
    }
    var scc_annotate_parser = GitAnnotateParser;
    if (sccType == "svn") {
        scc_annotate_parser = SvnAnnotateParser;
    }
    var sccSvc = Components.classes["@activestate.com/koSCC?type=" + sccType + ";1"].
                    getService(Components.interfaces.koISCC);
    var scc_executable = sccSvc.executable || sccSvc.name;
    var filename = koFileEx.leafName;
    // Double quote the paths on Windows.
    if (navigator.platform.startsWith("Win")) {
        scc_executable = '"' + scc_executable + '"';
        filename = '"' + filename + '"';
    }
    var cmd = scc_executable + ' annotate ' + filename;
    var runSvc = Components.classes["@activestate.com/koRunService;1"].
                    getService(Components.interfaces.koIRunService);
    var process = runSvc.RunAndNotify(cmd, koFileEx.dirName, '', '');
    var retval = process.wait(-1); /* wait till the process is done */
    if (retval == 0) {
        return scc_annotate_parser(process.getStdout());
    } else {
        throw Error(process.getStderr());
    }
    return [];
}

/**
 * Generate a unique color style for this entry.
 *
 * TODO: Be smarter - check both previous and next entries to ensure the color
 *       is different between changes.
 */
var GetUniqueStyle = function(sm, entry_styles, entry, last_entry) {
    // Default color for this author.
    var entryS = entry.toString();
    var style_num = entry_styles[entryS];
    if (style_num !== undefined) {
        return style_num;
    }
    // Create a color for this entry.
    var color;
    var style_num = 0;
    for (var item in entry_styles) {
        style_num += 1;
    }
    style_num = (style_num % 8);
    entry_styles[entryS] = style_num;
    return style_num;
}

/**
 * Show the annotations in the margin.
 */
var DisplayAnnotations = function(view, lines) {
    log.debug("DisplayAnnotations for " + lines.length + " lines");
    const MARGIN_STYLE_OFFSET = 255;
    /** @type Components.interfaces.ISciMoz */
    var sm = view.scimoz;
    sm.setMarginTypeN(MARGIN, sm.SC_MARGIN_TEXT); // left-justified text
    sm.setMarginWidthN(MARGIN, MARGIN_WIDTH);
    sm.setMarginSensitiveN(MARGIN, true); // Allow mouse clicks.
    sm.marginStyleOffset = MARGIN_STYLE_OFFSET;

    var isDarkScheme = view.scheme.isDarkBackground;
    // Scintilla colors are in BGR format.
    sm.styleSetBack(MARGIN_STYLE_OFFSET+1, isDarkScheme ? 0x442200 : 0xBBDDFF);
    sm.styleSetBack(MARGIN_STYLE_OFFSET+2, isDarkScheme ? 0x220044 : 0xDDFFBB);
    sm.styleSetBack(MARGIN_STYLE_OFFSET+3, isDarkScheme ? 0x004422 : 0xFFBBDD);
    sm.styleSetBack(MARGIN_STYLE_OFFSET+4, isDarkScheme ? 0x000022 : 0xFFFFDD);
    sm.styleSetBack(MARGIN_STYLE_OFFSET+5, isDarkScheme ? 0x002200 : 0xFFDDFF);
    sm.styleSetBack(MARGIN_STYLE_OFFSET+6, isDarkScheme ? 0x220000 : 0xDDFFFF);
    sm.styleSetBack(MARGIN_STYLE_OFFSET+7, isDarkScheme ? 0x440044 : 0xBBBBBB);
    sm.styleSetBack(MARGIN_STYLE_OFFSET+8, isDarkScheme ? 0x220022 : 0xDDDDDD);

    var entry_styles = {};
    var color, style;
    var entry, last_entry;
    for (var lineno=0; lineno < lines.length; lineno++) {
        entry = lines[lineno];
        if (!entry) {
            continue;
        }
        style = GetUniqueStyle(sm, entry_styles, entry, last_entry);
        sm.marginSetText(lineno, entry.slice(0, 2).join(": "));
        sm.marginSetStyle(lineno, style);
        last_entry = entry;
    }
}

/**
 * Handle annotate margin click and launch scc history dialog when clicked.
 */
var OnMarginClick = function(modifiers, position, margin) {
    log.debug("OnMarginClick:: margin " + margin);
    var view = ko.views.manager.currentView;
    if (margin != MARGIN) {
        view._annotate_orig_onMarginClick(modifiers, position, margin);
    }
    var lineno = view.scimoz.lineFromPosition(position);
    ko.commands.doCommand("cmd_SCChistory");
}

/**
 * Generate and show the annotations.
 */
var ShowAnnotations = function(view) {
    log.debug("ShowAnnotations");
    var lines = FetchAnnotationLines(view.koDoc.file);
    DisplayAnnotations(view, lines);
    view._annotate_lines = lines;
    view._annotate_orig_onMarginClick = view.onMarginClick;
    view.onMarginClick = OnMarginClick;
}

/**
 * Remove (hide) existing annotations.
 */
var RemoveAnnotations = function(view) {
    log.debug("RemoveAnnotations");
    view.scimoz.setMarginWidthN(MARGIN, 0);
    view.onMarginClick = view._annotate_orig_onMarginClick;
    delete view._annotate_orig_onMarginClick;
    delete view._annotate_lines;
}

try {
    var view = ko.views.manager.currentView;
    if (view) {
        if (view.scimoz.getMarginWidthN(MARGIN) > 0) {
            // Already visible - hide it.
            RemoveAnnotations(view);
        } else {
            ShowAnnotations(view);
        }
    }
} catch (ex) {
    log.exception(ex);
    ko.statusBar.AddMessage("annotate error" + ex.toString(), "macros", 5000, true);
}
