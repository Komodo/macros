/* Komodo-Comment-Storage-Tags
 * Feature: Create index by all the tags found in document.
 * Navigate Tags by adding a + after the first char in tag container
 * Example ◙+tag1,22◘   (will navigate to line 22 after adding the + before tag1)
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
var re =/\u25D9([^\u25D9\u25D8]*)\u25D8/g;

var i2,i3=1,t,t2,a,b,m,len,lenjs;
var matchingLines=[],tagar=[];
var allLines = alltext.split("\n");
for (var i = 0; i < allLines.length; i++) {
    a=allLines[i];
    do {
        m = re.exec(a);
        if (m) {
            t2=JSON.stringify(m);
            len=t2.length;
            lenjs=m.length;
            for (i2 = 1; i2 < lenjs; ++i2) {
                matchingLines.push(i);
                b=m[i2] ;
                tagar[i3]=b+  "." + (i+1);
                i3++;
            }
        }
    } while (m);
}
tagar.sort();
for each (var item in tagar) {
    t="\u25AA" + item +  "\u25AB ";
    len=t.length;
    scimoz.addText(len, t);
}

if (gotoLine==0) {gotoLine=currentLine;}
scimoz.gotoPos(gotoLine);