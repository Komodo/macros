<?php
/* Komodo-Comment-Storage
 * Feature: Toggle comments on/off in editor content.
 * Feature: Store tags inside comments in sql database
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
 *How to Upgrade: firstly toggle on the comments on all your files before you update.
 */

error_reporting(0);

$myapikey="SKDFK89338fnASDkf3"; #initial key
$myidkey="X1"; #initial id

if(!isset($securityforkomodo)){ #check if using komodofilebrowser.php
    
$apikey=addslashes($_GET['key']); #apikey from komodo
#getting the id matched with the comments. (for generating multiple id's on single server)
$myid=addslashes($_GET['id']); #my id from komodo

#load login information to sql database
require('config.inc.php');

#connect to sql database
$db = new PDO('mysql:host='.$database_host.';dbname='.$database.';charset=utf8', ''.$username.'', ''.$password.'');
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$db->setAttribute(PDO::ATTR_ORACLE_NULLS, PDO::NULL_EMPTY_STRING);
$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, FALSE);
$password='fs3SadhGFar4gd21';$username='sql';

#api security
$q = $db->prepare('SELECT * FROM komodo_comments_settings where apicode=? and uniid=?;');
$q->bindParam(1, $myapikey);
$q->bindParam(2, $myidkey);
$q->execute();
$check = $q->fetchAll(PDO::FETCH_ASSOC);
$codecheck=$check[0]['apicode'];$numcheck=$check[0]['num'];
if(empty($codecheck)){unset($db);die('access denied');}
else{
   $ct=$check[0]['ct'];
}                                                              

#create sql table if missing
$q2 = $db->prepare('select cid from komodo_comments LIMIT 2');
$q2->execute();
$check2 = $q2->fetchAll(PDO::FETCH_ASSOC);
$val=$check2[0]['cid'];
if($val === FALSE){require('komodocomments.db.php');}

#Prepare sql statements
$stmt = $db->prepare("INSERT INTO komodo_comments_files (fid,file,filetype) VALUES (?,?,1) ON DUPLICATE KEY UPDATE file=?,filetype=1;");
$stmt->bindParam(1, $theid);
$stmt->bindParam(2, $thefile);
$stmt->bindParam(3, $theid);

$stmt2 = $db->prepare("update komodo_comments_settings set num=? where apicode=? and uniid=?");
$stmt2->bindParam(1, $num);
$stmt2->bindParam(2, $apikey);
$stmt2->bindParam(3, $myidkey);

$stmt3 = $db->prepare('SELECT * FROM komodo_comments where id=? and ct=?');
$stmt3->bindParam(1, $commentid);
$stmt3->bindParam(2, $ct);

$stmt4 = $db->prepare("INSERT INTO komodo_comments (txt,ct,id) VALUES(?,?,?)");
$stmt4->bindParam(1, $comment);
$stmt4->bindParam(2, $ct);
$stmt4->bindParam(3, $commentid);

$stmt5 = $db->prepare("update komodo_comments set txt=? where id=? and ct=?");
$stmt5->bindParam(1, $comment);
$stmt5->bindParam(2, $commentid);
$stmt5->bindParam(3, $ct);

$stmt6 = $db->prepare("delete from komodo_comments where id=? and ct=?");
$stmt6->bindParam(1, $rmnote);
$stmt6->bindParam(2, $ct);

$stmt7 = $db->prepare("INSERT INTO komodo_comments_tags (ct,cid,txt) VALUES(?,?,?);");
$stmt7->bindParam(1, $ct);
$stmt7->bindParam(2, $cid);
$stmt7->bindParam(3, $matchtag);

#load the comment sent by komodo js script
$t=$_POST['txt'];
if(empty($t)){$t=$_GET['txt'];}
$str=urldecode($t);


#regex matches
#_comments
#if($str=='☺INDEX☻'){$index=1;}#get with js instead (maybe used another time)
$re = '/\x{263A}(\S*)\s?([^\x{263B}\x{263A}]*)\x{263B}\s?/u'; 
preg_match($re, $str, $matches);
$commentid=addslashes($matches[1]);
$comment=addslashes($matches[2]);
$firstchar=substr($commentid,0,1);
if($firstchar=='-'){
    $commentid=substr($commentid,1);
    $rmnote=$commentid;
}else{
    #_◙tags◘  25d9 25d8
    if(preg_match('/\x{25d8}/u',$str)){
        $re = '/\x{25d9}([^\x{25d8}]*)\x{25d8}\s?/u'; 
        preg_match_all($re, $str, $matches_tags);$toadd="";
    }
}

#number the note if no commentid set
if((empty($commentid)or ctype_digit(strval($commentid)))&&!isset($rmnote)&&!isset($index)){
    if(empty($commentid)){$num=$numcheck;++$num;$commentid=$num;}
    elseif($commentid>$numcheck){$num=$commentid +1;}
    if($numcheck<$num){
        try {
            $stmt2 ->execute();
        } catch(PDOException $ex) {
          #echo $ex->getMessage();
        }
    }
}

#get/check previous comment in sql database
 try {
    $stmt3 ->execute();
    $check = $stmt3->fetchAll(PDO::FETCH_ASSOC);
} catch(PDOException $ex) {
  #echo $ex->getMessage();
}

$oldnote=$check[0]['txt'];
$cid=$check[0]['cid'];
foreach($matches_tags[1] as $match){
     try {
        $stmt7->execute();
       } catch(PDOException $ex) {
          #echo $ex->getMessage();
       }
}

if(!isset($rmnote)&&!isset($index)){
    if(empty($comment)){ #toggle note on
        echo $toadd."☺$commentid $oldnote"."☻";
    }else{#put note into sql database
        if(empty($oldnote)){
            try {
                    $stmt4 ->execute();
                } catch(PDOException $ex) {
                  #echo $ex->getMessage();
                }
        }
        else{
            try {
                    $stmt5 ->execute();
                } catch(PDOException $ex) {
                  #echo $ex->getMessage();
                }
        }
        echo $toadd."☺$commentid ☻"; #toggle note off
    }
}else{
    try {
            $stmt6 ->execute();
        } catch(PDOException $ex) {
          #echo $ex->getMessage();
        }
}
unset($db);

}
?>