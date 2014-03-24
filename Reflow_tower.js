/**
 * This macro is to reorder selected lines, so that the shortest will be
 * pushed to top, the longest will go to bottom (look like a tower).
 *
 * The macro is useful to reorder Python's "import" lines.
 *
 * Author: ng.hong.quan
 **/

var sm = ko.views.manager.currentView.scimoz
var start = 0
var end = 0

/* Make `start` the beginning position of the first selected line,
 * and `end` the ending position of the last selected line. */
if (sm.anchor < sm.currentPos) {
    start = sm.positionFromLine(sm.lineFromPosition(sm.anchor))
    end = sm.getLineEndPosition(sm.lineFromPosition(sm.currentPos))
}
else {
    start = sm.positionFromLine(sm.lineFromPosition(sm.currentPos))
    end = sm.getLineEndPosition(sm.lineFromPosition(sm.anchor))
}

/* Get list of selected lines */
var lines = sm.getTextRange(start, end).split('\n')

/* Reorder */
lines.sort(function(a, b) {
    return a.length - b.length
})

// Select part of document
sm.setSel(start, end)
// Replace selection content
sm.replaceSel(lines.join('\n'))

