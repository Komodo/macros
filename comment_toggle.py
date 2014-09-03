#
# Toggle comment (on or off) for the current line, or over the selected lines.
#
# Author:  Todd Whiteman
# Version: 1.0

import logging
from xpcom.components import interfaces as Ci

log = logging.getLogger('macros:comment_toggler')
#log.setLevel(logging.INFO)

# Aliases
editor = komodo.editor
koDoc = komodo.koDoc
view = komodo.view

# Use if you want to override the default comment style with a custom one.
customCommentMap = {
    #u'python': '#~ ',
    #u'php': '//~ '
}

# Check if we have a custom comment type.
try:
    customComment = customCommentMap[koDoc.subLanguage.lower()]
except KeyError:
    customComment = None
print('customComment: %r' % (customComment, ))

def toggleLines(lineStart, lineEnd):
    for lineNo in range(lStart, lEnd+1):
        log.info("toggling line %d", lineNo)
        _, line = editor.getLine(lineNo)
        if (line.strip() == ''):
            continue
        # Get start position for text.
        lineStartPos = editor.positionFromLine(lineNo)
        wordStartPos = lineStartPos
        if line.lstrip() != line:
            wordStartPos = editor.wordEndPosition(lineStartPos, False)
        if customComment:
            log.info("using custom comment %r", customComment)
            word = editor.getTextRange(wordStartPos, wordStartPos+len(customComment))
            if (word == customComment):
                editor.targetStart = wordStartPos
                editor.targetEnd = wordStartPos + len(customComment)
                editor.replaceTarget('')
            else:
                editor.insertText(wordStartPos, customComment)
        else:
            log.info("using the language's comment service")
            commenter = view.languageObj.getLanguageService(Ci.koICommenterLanguageService)
            if not commenter:
                log.warn("No comment service available for this language")
                return
    
            style = editor.getStyleAt(wordStartPos)
            log.info("char is: %s", editor.getCharAt(wordStartPos))
            if style in view.languageObj.getCommentStyles():
                # It's a comment, uncomment it
                commenter.uncomment(editor)
            else:
                commenter.comment(editor)
            # Note: The comment service works over the complete selection.
            return

view.setFocus()
editor.beginUndoAction()
try:
    # Determine the line range.
    start = editor.selectionStart
    end = editor.selectionEnd
    if start != end:
        end = editor.positionBefore(end)
    lStart = editor.lineFromPosition(start)
    lEnd = editor.lineFromPosition(end)
    log.info("iterating over lines %d-%s", lStart, lEnd)
    toggleLines(lStart, lEnd)
    if start != end:
        editor.selectionStart = editor.positionFromLine(lStart)
        editor.selectionEnd = editor.getLineEndPosition(lEnd)
        editor.chooseCaretX()
except:
    log.error("Error", exc_info=True)
editor.endUndoAction()
