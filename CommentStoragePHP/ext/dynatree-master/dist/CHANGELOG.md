##### 1.2.9-0 (not yet released)

Note that probably there will be no further releases. 
Checkout [Fancytree](https://github.com/mar10/fancytree) instead.


##### 1.2.8 / 2015-07-04
  * #498 Fix bower error due to too long description


##### 1.2.7 / 2015-03-29
  * #495 Add bower support: `bower install dynatree`


##### 1.2.6 / 2014-05-11
  * Fixed issue 471: duplicate onQueryActivate(false) events
  * Fixed issue 470: Regression for issue 263 (IE9 overflow:auto causes container div to grow on hover)
  * Fixed issue 487: node.getKeyPath() always starts path with "/", regardless of tree.options.keyPathSeparator
  * Fixed issue 478: Unable to get property options of undefinied or null reference (regression of r693)
  * Fixed issue 473: postProcess callback does not get called in initAjax
  * Fixed issue 474: Support mixing radio and checkbox nodes in same tree and toggling select state for both
  * Fixed issue 458: Drag and Drop helper does not show dragged item text when drag start from icon or left of it
  * Update to jQuery 1.10.2, jQuery-UI 1.9.2, jQuery Cookie 1.4.1
  *  [details](http://code.google.com/p/dynatree/issues/list?can=1&q=Milestone%3ARelease1.2.6&colspec=Stars+ID+Type+Status+Modified+Priority+Milestone+Owner+Summary&x=status&y=milestone&mode=grid&cells=tiles)


##### 1.2.5 / 2013-11-19
  * _BREAKING CHANGE_: issue 379: tree.toDict() has a new parameter ´includeRoot´ (defaults to false).<br>Use `tree.toDict(true)` to achieve the previous behavior.
  * Fixed issue 411:  D'n'd for jQuery UI 1.10
  * Fixed issue 420:  Allow 0 as key
  *  [details](http://code.google.com/p/dynatree/issues/list?can=1&q=Milestone%3ARelease1.2.5&colspec=Stars+ID+Type+Status+Modified+Priority+Milestone+Owner+Summary&x=status&y=milestone&mode=grid&cells=tiles)

##### 1.2.4 / 2013-02-12

  * Fixes issue 402 (a regrression bug in removeChildren)
  *  [details](http://code.google.com/p/dynatree/issues/list?can=1&q=Milestone%3ARelease1.2.4&colspec=Stars+ID+Type+Status+Modified+Priority+Milestone+Owner+Summary&x=status&y=milestone&mode=grid&cells=tiles)


##### 1.2.3 / 2013-02-10

  * Fixes for jQuery 1.9
  * [details](http://code.google.com/p/dynatree/issues/list?can=1&q=Milestone%3ARelease1.2.3&colspec=Stars+ID+Type+Status+Modified+Priority+Milestone+Owner+Summary&x=status&y=milestone&mode=grid&cells=tiles)

##### 1.2.2 / 2012-10-07
*Thanks to Ben Gillis for sponsoring this release!*

  * Fixed issue 321: Drag helper icons display offset is incorrect
  * Fixed issue 332: Drag and Drop Allowed when returning false
  * Fixed issue 324: Drag and drop example bug: onDragOver doesn't allow return "after"
  * Added a sample for RTL support
  * The (unsupported) context menu plugin that I used for the sample was patched to fix a positioning bug.
  * Using [uglify](http://gruntjs.com/ grunt] and [https://github.com/mishoo/UglifyJS) in the build process.<br>jquery.dynatree.min.js has been reduced to 80% of previous size.<br>This file is now found in the `/dist` folder
  * Dropped compliance with [JSHint](http://www.jslint.com/ JSLint] in favor of [http://www.jshint.com/)
  * Updated to jQuery UI 1.8.24, jQuery 1.8.2
  

##### 1.2.1 / 2012-06-16
  * Fixed a regression in issue 202
  * Fixed issue 277: loadKeyPath exception when key doesn't exist when parent has no children
  * Fixed issue 278: Clicking on the scroll bar in a scrollable tree (overflow: scroll) causes onDragStart
  * Fixed issue 285: Emptying Lazy Loaded Nodes Causes Reload / Duplicate Children
  * Fixed issue 286: Dropping a node over it's own child causes JS error (second DND example)
  * Fixed issue 304: feedback that the node is not found
  * Fixed issue 313: IE9 have problem with link focus
  * Fixed issue 319: Moving a newly added node fails if it has never been rendered
  * Fixed D'n'd is broken for jQuery 1.6.1 (issue 268, regression of issue 211)
  * Fixed IE9 overflow:auto causes container div to grow on hover (issue 263)
  * Scrolling is enabled for drag'n'drop (requires CSS `overflow: scroll` on the container) (issue 244)
  * Improved ASP.NET support to decode data.d JSON strings (issue 202, credits to Joel Nelson)
  * New option `data.href` for JSON data (issue 241)
  * New method `node.isLoading()` (issue 260)
  * Fixed Ephemeral error on node.reloadChildren() in FF 7.0.1 (issue 231)
  * Fixed Helper appears outside container during drag ('flashing') (issue 258)
  * Fixed drag'n'drop for scrollable containers (issue 211)
  * Fixed broken icons, when line-height > 1em (issue 237)
  * Fixed $.dynatree.getNode() (issue 247)
  * Fixed tooltip doesn't support the caracter ' (apostrophe) (issue 226)
  * Deprecated getDtNodeFromElement() (use $.dynatree.getNode() instead)
  * Added sample for inline editing node titles.
  * Using dynatree for sample navigator.
  * Updated to jQuery 1.7.1, jQuery UI 1.8.17

##### 1.2.0 / 2011-09-17
  * Pass additional error info to onPostInit() (issue 224)
  * New node.onCreate() event to allow lazy binding (issue 210)
  * Native support for ASP.NET 3.5 Ajax services (issue 202)
  * Updated to jQuery 1.6.1<br>*NOTE*: Starting with jQuery 1.6 we must use `.prop('dtnode')` instead of `.attr('dtnode')` to get the Dynatree node from an HTML element.<br>See issue 203 for details.
  * Support `<a>` tags (issue 138)
  * Added node.isLazy()
  * New helper function `$.ui.dynatree.getNode(el)` returns a !DynaTreeNode object for a given DOM element or jQuery object.
  * Fixed problem with partial selection initialization (issue 193)
  * Fixed d'n'd sample (issue 185)
  * Fixed issue 186: Selecting parent selects unselectable children
  * Fixed dropping over a collapsed node
  * Removed some more debug messages.
  * Added sample on how to activate nodes according to URL.
  * Fixed context menu sample for jQuery 1.6 (issue 203)

##### 1.1.1 / 2011-03-01
  * Enable event bubbling in click events (issue 181)
  * Sample that combines context menu with drag'n'drop (issue 174).
  * Fixed sortChildren() on Safari (issue 180)
  * Removed debug messages (issue 178)
  * Fixed source pretty printing for IE.
  * Updated to jQuery 1.5.1

##### 1.1.0 / 2011-01-23
  * Expander icon disappeared while lazy loading (issue 167).
  * Allow empty lists when loading lazily (issue 168).
  * New callback `tree.onRender(node, span)` allows changing or binding after HTML markup was created.
  * New callback `tree.onCustomRender(node)` allows passing custom HTML markup for node titles.
  * New method `tree.renderInvisibleNodes()` forces creation of all HTML elements.<br>`node.render()` has new argument _includeInvisible_.    
  * New methods `tree.count()` and `node.countChildren()`.
  * Updated to jQuery 1.4.4 / jQuery-UI 1.8.7

##### 1.0.3 / 2010-12-12
  * Default skins now using CSS sprites (improved load time).
  * Simplified custom theming.
  * Checked with JSLint.
  * Some minor speed improvements (issue 159)
  * Fixed layout for IE 6,7 (issue 166).

##### 1.0.2 / 2010-11-23
  * Fixed layout when not using strict mode (issue 165).
  * Fixed lazy-loading empty nodes ('[]') (issue 164)

##### 1.0.1 / 2010-11-20
  * Build against jQuery 1.4 and jQuery UI 1.8
  * Drag'n'drop support.
  * Improveded HTML markup.
  * And a lot more...<br>See [UpdateToVersion10 Migration hints] for details.


==== Release 0.5 ====

##### 0.5.5 / 2010-11-07
  * Updated jQuery Context Menu Plugin to version 1.01
  * Fixed drag'n'drop sample

##### 0.5.4 / 2010-05-30
  * Dual licensed under the MIT or GPL Version 2 licenses (issue 144)
  * issue 140
  * issue 141

##### 0.5.3 / 2010-03-15
  * issue 137
  * Improved Ajax error logging
  * issue 135
  * issue 133

##### 0.5.2 / 2009-12-20
  * Added a drag and drop sample using standard plugins.
  * Improved the lazy load sample to use realistic Ajax calls with local files
  * Fixed persistence when reloading lazy nodes
  * Fixed the context menu sample (online includes had moved)
  * See also the [http://code.google.com/p/dynatree/issues/list?can=1&q=milestone:Release0.5.2+status%3AFixed%2CVerified&sort=-modified&colspec=ID%20Type%20Status%20Priority%20Milestone%20Owner%20Summary fix list].

##### 0.5.1 / 2009-08-16
  * Support for reloading the tree or single lazy nodes.
  * Optionally inserting child nodes (instead of appending).
  * Optionally display radio buttons instead of checkboxes (credits to Lukasz Lakomy).
  * Options to hide checkboxes or make them unselectable.
  * See also the [http://code.google.com/p/dynatree/issues/list?can=1&q=milestone:Release0.5.1+status%3AFixed%2CVerified&sort=-modified&colspec=ID%20Type%20Status%20Priority%20Milestone%20Owner%20Summary fix list].

##### 0.5.0 / 2009-07-15
  * Change how persistance and related events are working (no longer fires events)
  * Support for persistence with lazy trees
  * See also the [http://code.google.com/p/dynatree/issues/list?can=1&q=milestone:Release0.5+status%3AFixed%2CVerified&sort=-modified&colspec=ID%20Type%20Status%20Priority%20Milestone%20Owner%20Summary fix list].
  * See [UpdateToVersion05 Migration hints] for details.


==== Release 0.4 ====

See [UpdateToVersion04 Migration hints] for details.

##### 0.4.2 / 2009-04-18
  * Added support for callbacks after lazy loading.
  * Fixed a persistence bug.
  * Implemented cut/copy/paste in the context menu example.
  * See the [http://code.google.com/p/dynatree/issues/list?can=1&q=milestone:Release0.4.2+status%3AFixed%2CVerified&sort=-modified&colspec=ID%20Type%20Status%20Priority%20Milestone%20Owner%20Summary fix list].

##### 0.4.1 / 2009-03-23
  * See the [http://code.google.com/p/dynatree/issues/list?can=1&q=milestone:Release0.4.1+status%3AFixed%2CVerified&sort=-modified&colspec=ID%20Type%20Status%20Priority%20Milestone%20Owner%20Summary fix list].

##### 0.4.0 / 2009-03-12
  * Minor fixes

##### 0.4 rc-1

  * node.toDict() has a calbback function, for example to convert the keys, ..
  * 'view-source:' link on sample pages
  * dropped _bDebug; logMsg() now logs unconditionally. Use tree.logDebug() instead.
  * Cookie path configurable
  * Optimized loading time of large trees.
  * New functions node.expand(flag) and tree.visit(callback)
  * New css classes ui-dynatree-exp-c and ui-dynatree-ico-cf so we don't have to use mutliple class names in CSS (doesn't work with IE6) 
  * Implemented onExpand callback

##### 0.4 beta-2

  * Adding a node (e.g. by lazy read) now sets the multi-hier selection status correctly
  * New parameter for tree.getSelectedNodes(stopOnParents)
  * minExpandLevel > 1 now forces expansion when initializing 
  * Clear container div on create, so we can put 'ERROR: need JavaScript' here
  * Updated to jQuery 1.3.1 
  * Downgraded to jQuery UI 1.5.3 (1.6 is not yet released)
  * Example Browser
  
##### Main changes

  * 'selected'/'select' was renamed to 'active'/'activate'<br>This is more precise and allowed implementation of the new selection feature.
  * Selection support<br>Avable  mode: single selection, multi selection and multi-hierarchical.
  * Support for checkboxes
  * Changed syntax when initializing from a UL tag.<br>Most status information can now be passed in the {{{class}}} attribute, e.g {{{class='expanded selected focused active lazy folder'}}}.<br>The {{{data}}} attribute is not valid in strict html and may be avoided most of the time. It is still supported however, and may be used to attach additional custom data to the nodes.
  * Persistence was extended to active, focus, expand and selection status.<br>Also, it is no longer required define node-keys, because dummy keys are generated by default.
  * New API functions like {{{$("#tree").disable()}}}, {{{tree.visit()}}}, ...
  * New callbacks like {{{onClick(dtnode, event)}}}, {{{onQueryActivate(activate, dtnode)}}}, and {{{onActivate(dtnode)}}}.
  * The tree images are now defined in CSS, instead of image name options.
  * New {{{fx}}} option for animation effects when expanding/collapsing.
  * New node option 'data.addClass' to addcustom class names to nodes.
  * See the [http://code.google.com/p/dynatree/issues/list?can=1&q=milestone:Release0.4+status%3AFixed%2CVerified&sort=-modified&colspec=ID%20Type%20Status%20Priority%20Milestone%20Owner%20Summary Release 0.4 fixlist] for details.

#### Release 0.3

##### 0.3.1 (currently in the SVN manintenance branch only)
  * Fixes: issue #64

##### 0.3.0 / 2008-12-07
  * Changes: selectExpandsFolders is deprecated. Use clickFolderMode instead.
  * Enhancements: issue #5, issue #57

##### 0.3 RC2
  * Fixes: issue #52, issue #55 
  * Enhancements: issue #21, issue #22, issue #45, issue #58

##### 0.3 RC1
  * Fixes: issue #41, issue #42, issue #46, issue #51, issue #50, issue #48, issue #47, issue #43 
  * Enhancements: issue #40, issue #5 (experimental)

##### Main changes

  * jQuery plugin style: $(..).dynatree()
  * Keyboard navigation
  * Improved documentation
  * Hosted on a public platform
  * See the [http://code.google.com/p/dynatree/issues/list?can=1&q=milestone:Release0.3+status%3AFixed%2CVerified&sort=-modified&colspec=ID%20Type%20Status%20Priority%20Milestone%20Owner%20Summary Release 0.3 fixlist] for details.


##### Updating from a previous release
This is the first jQuery based release, so there is no update path.

#### 0.2 and before
Dynatree is based on [http://wwWendt.de/tech/lazytree lazytree 0.2].
I had to rename it, because there already was a jQuery plugin named _lazytree_.
