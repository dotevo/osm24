<?php
error_reporting(E_ALL);
if(!isset($_GET['_escaped_fragment_'])&&!strpos($_SERVER["HTTP_USER_AGENT"],"bot")&&!strpos($_SERVER["HTTP_USER_AGENT"],"Google-StructuredDataTestingTool")){
  include("main.php");
}
else{
  include("static.php");
}
?>