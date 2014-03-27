# This macro is to reorder selected lines, so that the shortest will be
# pushed to top, the longest will go to bottom (look like a tower).
#
# The macro is useful to reorder Python's "import" lines.
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

# Get list of selected lines. Also strip trailing spaces
lines = [l.rstrip() for l in sm.getTextRange(start, end).splitlines()]

# Sometimes, one line of code is splited to many, with trailing slash.
# We group these sublines to one and will count the length of the longest.
groupedlines = []  # Each element is a list of sublines
concat = False
for l in lines:
    if l.endswith('\\'):  # This line will be concatenated with following lines
        if not concat:
            groupedlines.append([l])
            concat = True
        else:
            groupedlines[-1].append(l)  # Append to the latest list of sublines
    else:
        if concat:      # Last subline to concat
            groupedlines[-1].append(l)
            concat = False
        else:
            groupedlines.append([l])


# Reorder by length
groupedlines.sort(key=lambda group: max(len(l) for l in group))
# Flatten groupedlines
lines = []
for g in groupedlines:
    lines.extend(g)

# Select part of document
sm.setSel(start, end)
# Replace selection content
eol = eollib.eol2eolStr[sm.eOLMode]
sm.replaceSel(eol.join(lines))
