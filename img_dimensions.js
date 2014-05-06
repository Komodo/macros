/**
 * Execute the macro insdie an img tag in an html file, which the src attribute
 * filled in.  The macro will load the image and input the height and width of
 * the image attributes with the correct dimensions
 *
 * Type:  On Demand
 *
 * @source        https://github.com/Komodo/macros
 * @author        Eric Promislow
 * @author        Carey Hoffman
 * @version       0.3
 */

var view = ko.views.manager.currentView;
var scimoz = view.scimoz;
var currentPos = scimoz.currentPos;
var currentLine = scimoz.lineFromPosition(currentPos);
var lineStartPos = scimoz.positionFromLine(currentLine);
var lineEndPos = scimoz.getLineEndPosition(currentLine);
var text = scimoz.getTextRange(lineStartPos, lineEndPos);
if (/<img.*src=["'](.+?)["']/.test(text)) {
    var url = RegExp.$1;
    var img = new Image();
    var baseUrl = view.koDoc.file.dirName;
    alert(baseUrl)
    url = ko.uriparse.pathToURI(baseUrl + "//" + url);
    img.src = url;
    alert(img.src)
    var writeTag = function() {
        if (!img.height || !img.width) {
            ko.statusBar.AddMessage("No img info at " + img.src,
                                    "img_dimensions_macro",
                                    3000,
                                    false);
        } else {
            var newText = (' height="' + img.height + '" ' +
                           ' width="' + img.width + '"');
            scimoz.insertText(lineEndPos, newText);
        }
    }
    img.addEventListener("load", writeTag(), false);
}
