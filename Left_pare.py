# This macro is to remove 1 character form selected line on the left.
# Useful to clean code copied from diff file.
#
# Author: Nguyễn Hồng Quân (ng.hong.quan@gmail.com)

import eollib
from xpcom import components

viewSvc = components.classes["@activestate.com/koViewService;1"]\
    .getService(components.interfaces.koIViewService)
view = viewSvc.currentView
view = view.queryInterface(components.interfaces.koIScintillaView)
sm = view.scimoz

# Make `start` the beginning position of the first selected line,
# and `end` the ending position of the last selected line.
start = sm.positionFromLine(sm.lineFromPosition(sm.selectionStart))
end = sm.getLineEndPosition(sm.lineFromPosition(sm.selectionEnd))

lines = tuple(sm.getTextRange(start, end).splitlines())
# Cut one character from the left and combine lines to new text
eol = eollib.eol2eolStr[sm.eOLMode]
text = eol.join(l[1:] for l in lines)

# Select part of document
sm.setSel(start, end)
# Replace selection content
sm.replaceSel(text)
# Keep selection to let user continue to apply this macro
sm.setSel(start, start+len(text.encode('utf-8')))
