
/**
 * @fileoverview  Enter trigger for PHPdoc (code based on TAB trigger for Abbreviations by Stan Angeloff)
 *
 * @source        https://github.com/Komodo/macros
 * @author        Nathan Rijksen (http://naatan.com/)
 * @contributor   Todd Whiteman
 * @contributor   Michal Kocarek (http://brainbox.cz/)
 * @contributor   Alexander Kavoun (http://takkmoil.com/)
 * @version       0.2.5
 */

if ('undefined' === typeof(extensions)) {
    /**
     * Komodo Extensions Namespace.
     * This namespace was suggested by JeffG. More information is available at:
     *    {@link http://community.activestate.com/forum-topic/extension-s-namespace}
     *
     * @type  Object
     */
    extensions = {};
}

if (extensions.AutoTriggerDoc && extensions.AutoTriggerDoc.onKeyPress) {
    // Remove the existing trigger handler, we'll re-instate it.
    var editor_pane = ko.views.manager.topView;
    editor_pane.removeEventListener('keypress', extensions.AutoTriggerDoc.onKeyPress, true);
}
extensions.AutoTriggerDoc = {};

(function() {

    /**
     * RegExp for matching function arguments in match $1 for PHP
     */
    var re_function_php = /^\s*function\s*?[-_a-z0-9]*?\s*?\((.*)\).*/i;

    /**
     * RegExp for matching function arguments in match $1 for JavaScript
     */
    var re_function_javascript = /^\s*[(?:(?:abstract|final|static|private|public|protected)\s+?)|[-_a-z0-9]*:\s*?]*?function\s*?[-_a-z0-9]*?\s*?\((.*)\).*/i;

    /**
     * RegExp for matching parameter info in PHP
     */
    var re_param_php = /\s*?(?:([_a-z][_a-z0-9]*)\s+)?(\$[_a-z][_a-z0-9]*).*/i;

    /**
     * RegExp for matching parameter info in JavaScript
     */
    var re_param_javascript = /\s*?([\-_a-z0-9]+).*/i;

    var log = ko.logging.getLogger('AutoTriggerDoc');

    this.onKeyPress = function(e) {
        try {
            // Only trap when ENTER pressed with no modifiers
            if (e.keyCode !== 13 || e.ctrlKey || e.altKey || e.shiftKey) return true;

            //log.debug('onKeyPress:: enter key pressed:: keyCode: ' + e.keyCode);

            var preventDefault = endUndoAction = false;
            try {
                // Create shorthands for 'currentView'
                var view = ko.views.manager.currentView;
                /**
                 * @type {Components.interfaces.ISciMoz}
                 */
                var editor = view.scimoz;

                // Don't do anything if there is a selection within the document
                if (editor.anchor != editor.currentPos) return false;

                var lang = (view.koDoc || view.document).language;

                // Start at cursor position and break at any non-word character
                var currentPos = editor.currentPos;
                var rangeStart = currentPos - 3;
                var strLeft = editor.getTextRange(rangeStart, currentPos);

                // If we have a matching range, make sure it's a word
                if (strLeft !== null && strLeft == '/**') {

                    var lineno = editor.lineFromPosition(currentPos);
                    var nxt_start = editor.positionFromLine(lineno+1);
                    var nxt_end = editor.getLineEndPosition(lineno+1);
                    var nxtLine = editor.getTextRange(nxt_start, nxt_end);

                    if (nxtLine.match(/^[\t ]*\*/)) { return true; }

                    preventDefault = endUndoAction = true;

                    var snipType;
                    var snipText = '\n * [[%tabstop:Summary]]\n';
                    var type_tabstop = '[[%tabstop:Type]]';
                    var desc_tabstop = '[[%tabstop:Description]]';

                    var nl_inserted = false; // Was newline after summary inserted?

                    if (nxtLine.match(/\bfunction\b/i)) { // Is word function on the line?
                        if (lang == 'PHP') {
                            var fvars = nxtLine.replace(re_function_php, '$1');
                            fvars = fvars.split(',');
                            var matches = [];
                            var len = [0,7,0];

                            // Matching all params and determinig the longest
                            for (var i = 0; i < fvars.length; ++i) {
                                matches[i] = fvars[i].match(re_param_php);
                                if (!matches[i]) continue;
                                for (var j = 0; j < matches[i].length; j++) {
                                    if (undefined == matches[i][j]) continue;
                                    if (len[j] < matches[i][j].length) { len[j] = matches[i][j].length; }
                                }
                            }

                            for (var i = 0; i < matches.length; ++i) {
                                if (!matches[i]) continue;
                                if (!nl_inserted) { snipText += ' * \n'; nl_inserted = true; }
                                snipText +=
                                    ' * @param ' + type_tabstop.replace('Type', matches[i][1] || 'unknown') +
                                    new Array(len[1] - (matches[i][1] ? matches[i][1].length : 7) + 1).join(' ') + ' ' +
                                    matches[i][2] + new Array(len[2] - matches[i][2].length + 1).join(' ') + ' ' + desc_tabstop + '\n';
                            }

                            snipText += ' * \n * @return ' + type_tabstop + new Array(len[1] - 3).join(' ') + ' ' + desc_tabstop + '\n';
                        } else if (lang == "JavaScript") {
                            var fvars = nxtLine.replace(re_function_javascript, '$1');
                            fvars = fvars.split(',');
                            var matches = [];
                            var len = [0,0,0];

                            // Matching all params and determinig the longest
                            for (var i = 0; i < fvars.length; ++i) {
                                matches[i] = fvars[i].match(re_param_javascript);
                                if (!matches[i]) continue;
                                for (var j = 0; j < matches[i].length; j++) {
                                    if (undefined == matches[i][j]) continue;
                                    if (len[j] < matches[i][j].length) { len[j] = matches[i][j].length; }
                                }
                            }

                            for (var i = 0; i < fvars.length; ++i) {
                                if (!matches[i]) continue;
                                if (!nl_inserted) { snipText += ' * \n'; nl_inserted = true; }
                                snipText += ' * @param   {' + type_tabstop + '} ' + matches[i][1] + new Array(len[1] - matches[i][1].length + 1).join(' ') + ' ' + desc_tabstop + '\n';
                            }
                            snipText += ' * \n * @returns {' + type_tabstop + '} ' + desc_tabstop + '\n';
                        }
                        snipType = 'function';
                    } else if (nxtLine.match(/^\s*?class/i)) {
                        snipType = 'class';
                    } else if (nxtLine.match(/^\s*?(?:var|private|public|protected)/i)) {
                        if (lang == 'PHP') {
                            snipText = '\n * @var ' + type_tabstop.replace('unknown') + ' ' + desc_tabstop + '\n';
                        } else if (lang == 'JavaScript') {
                            snipText = '\n * @type ' + type_tabstop + ' ' + desc_tabstop + '\n';
                        }
                        snipType = 'var';
                    }
                    if (snipType) {
                        var snippet = ko.abbrev.findAbbrevSnippet('phpdoc_' + snipType);
                        if (snippet) { snipText += snippet.value + '\n'; }
                    }
                    snipText += ' */';
                    var fakeSnippet = {
                        hasAttribute: function(name) {
                            return name in this;
                        },
                        getStringAttribute: function(name) {
                            return this[name];
                        },
                        name: 'autodoc snippet',
                        indent_relative: 'true',
                        value: snipText
                    };
                    //log.debug('snipText: ' + snipText);
                    ko.projects.snippetInsert(fakeSnippet);
                }
            } finally {
                if (preventDefault) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            }
        } catch(ex) {
            log.exception(ex);
        }
        return null;
    }
    var editor_pane = ko.views.manager.topView;
    editor_pane.addEventListener('keypress', this.onKeyPress, true);

}).apply(extensions.AutoTriggerDoc);
