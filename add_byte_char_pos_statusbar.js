if (typeof(extensions) == "undefined") {
    extensions = {};
}
// Remove the listen if it's exists
// Each time this macro runs it will create a new addByteCharPos function.
// This changes the references saved in the eventListener so we much remove it
// before the new functions reference is created.
window.removeEventListener('current_view_linecol_changed', extensions.addByteCharPos);

extensions.addByteCharPos = function(){
    setTimeout(addByteCharPos, 1);
};

window.addEventListener('current_view_linecol_changed', extensions.addByteCharPos);

function addByteCharPos() {

    var scimoz = ko.views.manager.currentView.scimoz;  // Get scintilla

    var bytePos = scimoz.currentPos;  // Get byte pos of cursor
    var charPos = scimoz.charPosAtPosition(bytePos);  // Get char pos of cursor

    // Get the statusbar line and column section to append new stats
    var lineColWidget = document.getElementById('statusbar-line-col');

    // If these mis-match then there are mutliple byte chars in the doc.
    // Give the char position rather than the byte/absolute position.
    if (bytePos == charPos) {
        var lineColText = lineColWidget.getAttribute("label") +
                        " Byte: " + bytePos;
    } else {
        var lineColText = lineColWidget.getAttribute("label") +
                        " Char: " + charPos;
    }
    // Attach new string
    lineColWidget.setAttribute('label', lineColText);
}