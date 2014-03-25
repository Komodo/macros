# This macro is to remove 1 character form selected line on the left.
# Useful to clean code copied from diff file.
#
# Author: Nguyễn Hồng Quân (ng.hong.quan@gmail.com)

from xpcom import components
viewSvc = components.classes["@activestate.com/koViewService;1"]\
    .getService(components.interfaces.koIViewService)
view = viewSvc.currentView
view = view.queryInterface(components.interfaces.koIScintillaView)
sm = view.scimoz

# Make `start` the beginning position of the first selected line,
# and `end` the ending position of the last selected line.
if sm.anchor < sm.currentPos:
    start = sm.positionFromLine(sm.lineFromPosition(sm.anchor))
    end = sm.getLineEndPosition(sm.lineFromPosition(sm.currentPos))
else:
    start = sm.positionFromLine(sm.lineFromPosition(sm.currentPos))
    end = sm.getLineEndPosition(sm.lineFromPosition(sm.anchor))

lines = tuple(sm.getTextRange(start, end).splitlines())
# Cut one character from the left
lines = tuple(l[1:] for l in lines)

# Select part of document
sm.setSel(start, end)
# Replace selection content
sm.replaceSel('\n'.join(lines))

