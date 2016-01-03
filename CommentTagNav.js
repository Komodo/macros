/* Komodo-Comment-Storage-Tag-Navigation
 * Navigate Tags by adding a + after the first char in tag container
 * Example ◙+tag1,22◘   (will navigate to line 22 after adding the + before tag1)
 * 
 * Scimos javascript macro developed to be used in Komodo edit
 * Tag-format: ◙tags◘ (to be used inside comments)
 * Format:      ☺No-space-123ABC-ID The Text\nNew line text ◙tag1◘ ◙tag2◘☻
 * Or Format: ☺The Text\nNew line text☻(space after ☺ will make the id to be automatically generated)
 * Type:  On Demand
 *
 * @source        https://github.com/krizoek/komodo-comment-toggler
 * @author        Kristoffer Bernssen
 * @version       0.1
 * @copyright    Creative Commons Attribution 4.0 International (CC BY 4.0)
 * 
 */

var view = ko.views.manager.currentView;
var scimoz = view.scimoz;
var currentPos = scimoz.currentPos;
var currentLine = scimoz.lineFromPosition(currentPos);
var lineStartPos = scimoz.positionFromLine(currentLine);
var lineEndPos = scimoz.getLineEndPosition(currentLine);
var text = scimoz.getTextRange(lineStartPos, lineEndPos);
var alltext =  scimoz.text;
var gotoLine,ifLine = 0;
var re =/\u25AA([^\u25AA\u25AB]*)\u25AB/g;
var i2,t,t2,a,b,c,m,len,lenjs;
var matchingLines = [];
var allLines = alltext.split("\n");
for (var i = 0; i < allLines.length; i++) {
    a=allLines[i];
    do {
        m = re.exec(a);
        if (m) {
            lenjs=m.length;
            for (i2 = 1; i2 < lenjs; ++i2) {
                matchingLines.push(i);
                b=m[i2] ;
                t2=b[0];
                if (t2=="+") {
                    c=b.replace('+','');
                    var ar = b.split(".");
                    scimoz.text = scimoz.text.replace(b, c);
                    gotoLine=(ar[1] -1);
                }
            }
        }
    } while (m);
}

if (gotoLine==0) {gotoLine=currentLine;}
scimoz.gotoLine(gotoLine);