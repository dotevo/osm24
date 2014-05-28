<?php
    include('config.php');


    if (isset($_GET['lon'])&&isset($_GET['lat'])&&isset($_GET['text'])) {
      $url = 'http://api.openstreetmap.org/api/0.6/notes';
      $fields = array('lon'=>$_GET['lon'],'lat'=>$_GET['lat'],'text'=>$_GET['text']);
      $ch = curl_init();
      curl_setopt($ch, CURLOPT_URL,$url);
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
      curl_setopt($ch, CURLOPT_HEADER, 1);
      curl_setopt($ch, CURLOPT_POST, true);
      curl_setopt($ch, CURLOPT_POSTFIELDS, $fields);
      curl_setopt($ch, CURLOPT_USERPWD, USERNAME.":".PASSWORD);
      curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
      $curl_scraped_page = curl_exec($ch);
      curl_close($ch);

      echo $curl_scraped_page;
    } 
?>
