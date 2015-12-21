/*☺Komodo-Comment-Storage
 Ajax driven storefor comments in sql database, and toggle comments on/off in editor 
content.
 Scimos javascript macro developed to be used in Komodo edit
 Format: ☺No-space-123ABC-ID The Text\nNew line text☻
 If you write ☺ The Text...☻ without a ID in the beginning, it will automatically generate a ID that will be inserted. (It is important to have a space after the starting tag ☺)
 * Type:  On Demand
 *
 * @source        https://github.com/krizoek/komodo-comment-toggler
 * @author        Kristoffer Bernssen
 * @version       0.1
 * @copyright    Creative Commons Attribution 4.0 International (CC BY 
4.0)
 * 

You'll need the following files for your web-server:
https://github.com/krizoek/komodo-comment-storage/blob/master/config.inc.php
https://github.com/krizoek/komodo-comment-storage/blob/master/komodo.php
 
 Installing

    loading the js script in komodo macro

    Put the php files into your webserver directory of your choice

    configure config.inc.php to match your sql login information

now run the macro.
 
 ☻*/
var myid="X1";
var myapikey="SKDFK89338fnASDkf3";
var serverurl="http://127.0.0.1/";

var view = ko.views.manager.currentView;
var scimoz = view.scimoz;
var currentPos = scimoz.currentPos;
var currentLine = scimoz.lineFromPosition(currentPos);
var lineStartPos = scimoz.positionFromLine(currentLine);
var lineEndPos = scimoz.getLineEndPosition(currentLine);
var text = scimoz.getTextRange(lineStartPos, lineEndPos);
var alltext =  scimoz.text;
var regexp = /\u263A[^\u263A\u263B]*\u263B/gi;
var matches_array = alltext.match(regexp);

var b= 
matches_array.length,index,t,params,xhttp,str="test",randnum,geturl;
for (index = 0; index < b; ++index) {
    t=matches_array[index];
    if(typeof(t)!== 'undefined'){
        if (str.length == 2) {
         }else{
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
              if (xhttp.readyState == 4 && xhttp.status == 200) {
                scimoz.text = scimoz.text.replace(t, 
xhttp.responseText);
              }
            };
            randnum=Math.floor((Math.random() * 9999999999) + 1200);
            geturl=serverurl + "komodo.php?id="+ myid + "&key=" + 
myapikey + "&r=" + randnum;
            params="txt=" + encodeURIComponent(t);
            xhttp.open("POST", geturl, true);
            xhttp.setRequestHeader("Content-type", 
"application/x-www-form-urlencoded");
            xhttp.setRequestHeader("Content-length", params.length);
            xhttp.setRequestHeader("Connection", "close");
            xhttp.send(params);   
        }
    }
}
//scimoz.text  =scimoz.text.replace(/\u263A[^\u263A\u263B]*\u263B/gi, 
'\u263A\u263B');  //replace all
scimoz.gotoPos(currentPos);
