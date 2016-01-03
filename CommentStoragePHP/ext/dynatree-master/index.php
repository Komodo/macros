<?php

echo'<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
  <meta http-equiv="content-type" content="text/html; charset=ISO-8859-1">
  <title>Dynatree - Example</title>

  <script src="../jquery/jquery.js" type="text/javascript"></script>
  <script src="../jquery/jquery-ui.custom.js" type="text/javascript"></script>
  <script src="../jquery/jquery.cookie.js" type="text/javascript"></script>

  <link href="../src/skin/ui.dynatree.css" rel="stylesheet" type="text/css">
  <script src="../src/jquery.dynatree.js" type="text/javascript"></script>

  <!-- (Irrelevant source removed.) -->

<script type="text/javascript">
  $(function(){
    $("#tree").dynatree({
      persist: true,
      checkbox: true,
      selectMode: 3,
      onPostInit: function(isReloading, isError) {
         logMsg("onPostInit(%o, %o)", isReloading, isError);
         // Re-fire onActivate, so the text is update
         this.reactivate();
      },
      onActivate: function(node) {
        $("#echoActive").text(node.data.title);
      },
      onDeactivate: function(node) {
        $("#echoActive").text("-");
      },
      onDblClick: function(node, event) {
        logMsg("onDblClick(%o, %o)", node, event);
        node.toggleExpand();
      }
    });
  });
</script>
</head>

<body class="example">
  <h1>Example: Persist</h1>
  <p class="description">
    Cookie persistence is enabled here.<br>
    Also, double-click handler expands document nodes.<br>
    Select a node and hit [F5] to refresh, to see how the active node and
    expansion and selection states are restored.<br>
    <br>
    NOTE: if this doesn\'t seem to work, it\'s probably because the frame
    content is cached by the browser.<br>
    Try this example as an
    <a href="#" target="_blank">unframed page</a>.
  </p>

  <!-- Tree container -->
  <div id="tree">
    <ul>';
      
echo'</ul>
  </div>
  <div>Active node: <span id="echoActive">-</span></div>

  <!-- (Irrelevant source removed.) -->
</body>
</html>';

/*
<li id="id1" title="Look, a tool tip!">item1 with key and tooltip
      <li id="id2">item2
      <li id="id3" class="folder">Folder with some children
        <ul>
          <li id="id3.1">Sub-item 3.1
            <ul>
              <li id="id3.1.1">Sub-item 3.1.1
              <li id="id3.1.2">Sub-item 3.1.2
            </ul>
          <li id="id3.2">Sub-item 3.2
            <ul>
              <li id="id3.2.1">Sub-item 3.2.1
              <li id="id3.2.2">Sub-item 3.2.2
            </ul>
        </ul>
      <li id="id4" class="expanded">Document with some children (expanded on init)
        <ul>
          <li id="id4.1"  class="active focused">Sub-item 4.1 (active and focus on init)
            <ul>
              <li id="id4.1.1">Sub-item 4.1.1
              <li id="id4.1.2">Sub-item 4.1.2
            </ul>
          <li id="id4.2">Sub-item 4.2
            <ul>
              <li id="id4.2.1">Sub-item 4.2.1
              <li id="id4.2.2">Sub-item 4.2.2
            </ul>
        </ul>
*/
?>