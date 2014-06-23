<?php
error_reporting(E_ALL);
//if you are googlebot
if(!isset($_GET['_escaped_fragment_'])){
  include("main.php");
}
//Normal user
else{
  include("static.php");
}
?>
