/**
 * Run this macro to swaps the positions of the character at the current caret
 * position and the next character in the line.
 *
 * Type:  On Demand
 *
 * @source        https://github.com/Komodo/macros
 * @author        Carey Hoffman
 * @version       0.1
 */

view = ko.views.manager.currentView;
scimoz = view.scimoz;
curPos = scimoz.currentPos;

transpose();
function transpose(){
    forePos = scimoz.positionBefore(curPos);
    aftPos = scimoz.currentPos;
    foreChar = scimoz.getWCharAt(forePos);
    aftChar = scimoz.getWCharAt(aftPos);
    replace(forePos, aftChar);
    replace(aftPos, foreChar);
    scimoz.gotoPos(scimoz.positionAfter(curPos))
}

function replace(pos, character) {
    scimoz.deleteRange(pos,1);
    scimoz.insertText(pos, character);
}