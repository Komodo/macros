/* Komodo-Comment-Storage
 * Feature: Store comments and tags in sql database, and toggle comments on/off in editor content.
 * 
 * Scimos javascript macro developed to be used in Komodo edit
 * Tag-format: ◙tags◘ (to be used inside comments)
 * Format:      ☺No-space-123ABC-ID The Text\nNew line text ◙tag1◘ ◙tag2◘☻
 * Or Format: ☺The Text\nNew line text☻(space after ☺ will make the id to be automatically generated)
 * Type:  On Demand
 *
 * @source        https://github.com/krizoek/komodo-comment-toggler
 * @author        Kristoffer Bernssen
 * @version       0.1
 * @copyright    Creative Commons Attribution 4.0 International (CC BY 4.0)
 * 
 */
 
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
function request_handler(myid,myapikey,lineStartPos,t) {
    var xht;
    xht = new XMLHttpRequest();
    xht.timeout = 4000;
    xht.onreadystatechange = function(index) {
      if (xht.readyState == 4) {
        if (xht.status == 200 || window.location.href.indexOf("http")==-1) {
            console.log(t+" REPLACE WITH: "+xht.responseText);
            scimoz.text = scimoz.text.replace(t, xht.responseText);
        } else {
            console.error(xht.statusText);
          }
      }
    };
    randnum=Math.floor((Math.random() * 9999999999) + 12000);
    geturl=serverurl + "komodo.php?id="+ myid + "&key=" + myapikey + "&r=" + randnum + "&l=" + lineStartPos;
    params="txt=" + encodeURIComponent(t);
    xht.open("POST", geturl, true);
    xht.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xht.setRequestHeader("Content-length", params.length);
    xht.setRequestHeader("Connection", "close");
    
    xht.onerror = function (e) {
        console.error(xht.statusText);
      };
    
    xht.send(params); 
}
var b= matches_array.length,index,t,params,randnum,geturl,htpn;
var htp = {}
for (index = 0; index < b; ++index) {
    t=matches_array[index];
    
    if(typeof(t)!== 'undefined'){
        if (t.length <= 3) {
         }else{
            request_handler(myid,myapikey,lineStartPos,t);
        }
    }
}
//scimoz.text  =scimoz.text.replace(/\u263A[^\u263A\u263B]*\u263B/gi, '\u263A\u263B');  //replace all
scimoz.gotoPos(currentPos);