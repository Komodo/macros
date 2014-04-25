#
# Swap the assignment fields of the selected text - works across multiple lines,
# swapping assignments on each selected line.
#

text = ""
if not komodo.editor.selText:
    # No selection - abort.
    return

newlines = []
for line in komodo.editor.selText.splitlines(1):
    idx = line.find("=")
    if idx < 0:
        # Allow argument (comma separated) swapping too.
        idx = line.find(",")
    if idx > 0:
        # The complicated swap code, find all the different positions.
        leftCode = line[:idx].rstrip()
        rightCode = line[idx+1:].lstrip()
        beginSpaces = leftCode[:len(leftCode) - len(leftCode.lstrip())]
        endSpaces = rightCode[len(rightCode) - (len(rightCode) - len(rightCode.rstrip())):]
        middle = line[len(leftCode):idx + ((len(line) - idx) - len(rightCode))]
        leftCode = leftCode.lstrip()
        rightCode = rightCode.rstrip()
        endField = ""
        # Special case for C or Javascript code (a trailing semi-colan).
        if rightCode[-1] in (";"):
            endField = rightCode[-1]
            rightCode = rightCode[:-1]
        # And now we rotate it.
        newlines.append(beginSpaces + rightCode + middle + leftCode + endField + endSpaces)
    else:
        # Didn't find anything - so don't change it.
        newlines.append(line)

# Update the selection with the swapped code.
komodo.editor.replaceSel("".join(newlines))
