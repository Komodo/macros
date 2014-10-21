/**
 * @fileoverview  Allow multiple rows of editor tabs in the Komodo tab strip.
 * @author        Todd Whiteman (toddw@activestate.com)
 * @version       0.1
 */

// Helper for checking if we want to include a given node.
var ElementFilter = function(tagname, attr, value) {
    var checkElem = function(node) {
        if (node.localName == tagname &&
            node.getAttribute(attr) == value) {
            return true;
        }
        return false;
    };
    return checkElem;
};
// Helper to walk all child nodes (regular and anonymous elements).
var KomodoDomWalker = function(node) {
    var child;
    // Regular DOM child elements.
    for (var i=0; i < node.childNodes.length; i++) {
        child = node.childNodes[i];
        if (!(child instanceof Element)) {
            continue;
        }
        yield child;
        for (var subchild in KomodoDomWalker(child)) {
            yield subchild;
        }
    }
    // Anonymous XBL children.
    var anon_children = document.getAnonymousNodes(node);
    if (!anon_children) {
        return;
    }
    for (var i=0; i < anon_children.length; i++) {
        child = anon_children[i];
        if (!(child instanceof Element)) {
            continue;
        }
        yield child;
        for (var subchild in KomodoDomWalker(child)) {
            yield subchild;
        }
    }
}
// Reduce set of nodes using the checkFn.
var filterNodes = function(node, checkFn) {
    for (var child in KomodoDomWalker(node)) {
        if (checkFn(child)) {
            yield child;
        }
    }
}

// The main top-level view element in Komodo.
var topview = document.getElementById("topview");
// Find the scrollbox and inner box elements, change their CSS to allow wrapping.
for (var tabstrip_box in filterNodes(topview, ElementFilter("box", "class", "tabstrip-box"))) {
    for (var scroll_box in filterNodes(tabstrip_box, ElementFilter("scrollbox", "anonid", "scrollbox"))) {
        // Remove CSS overflowing.
        scroll_box.setAttribute("style", "overflow: visible");
        for (var inner_box in filterNodes(scroll_box, ElementFilter("box", "class", "box-inherit scrollbox-innerbox"))) {
            // Make the tab box wrap around.
            inner_box.setAttribute("style", "display: inline-block");
        }
    }
}
