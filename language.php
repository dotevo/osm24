<?php
session_start();
if(isset($_GET['lang'])){
  $lang=preg_replace('/[^A-Za-z0-9\-\_]/', '', $_GET['lang']);
  $_SESSION['lang'] = $lang;
}

if(isset($_SESSION['lang'])){
  //Create supported langs array
  $files = scandir("lang");
  foreach($files as $file){
    $filen=explode(".",$file);
    //is lang
    if(strlen($filen[0])>0){
      $filen=explode("_",$filen[0]);
      $supportedLangs[$filen[0]]=$file;
      //if type pl_PL
      if(count($filen)>1)
        $supportedLangs[$filen[0]."-".$filen[1]]=$file;
    }
  }
  //Language detection from browser
  $languages = explode(',',$_SERVER['HTTP_ACCEPT_LANGUAGE']);
  foreach($languages as $lang){
    if(array_key_exists($lang, $supportedLangs)){
      $_SESSION['lang']=$supportedLangs[$lang];
      break;
    }
  }
}

if(file_exists("lang/".$_SESSION['lang'].".php"))
  include("lang/".$_SESSION['lang'].".php");
else{
  $_SESSION['lang']='en_EN';
  include("lang/".$_SESSION['lang'].".php");
}

$slang=explode('_',$_SESSION['lang']);
$_SESSION['slang']=$slang[0];
?>

