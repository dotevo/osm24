<?php
function print_poi($tags,$lat,$lon,$id,$type){
  $ret="<div itemscope itemtype=\"http://data-vocabulary.org/Organization\">";
  if($type!="")
    $type="type=".$type."/";
  if(isset($_GET['id'])){
    $ret.="<br/><span itemprop=\"name\">".$tags['name']."</span><br/>";

    //GEO
    $ret.="<span itemprop=\"geo\" itemscope itemtype=\"http://schema.org/GeoCoordinates\">";
    $ret.="<meta itemprop=\"latitude\" content=\"".$lat."\" />";
    $ret.="<meta itemprop=\"longitude\" content=\"".$lon."\" />";
    $ret .= "</span>";
    //ADDR
    $ret.="<span itemprop=\"address\" itemscope itemtype=\"http://data-vocabulary.org/Address\">";
    if(isset($tags['addr:street']))
      $ret.= "<span itemprop=\"street-address\">".$tags['addr:street']." ".$tags['addr:housenumber']."</span>";
    if(isset($tags['addr:city']))
      $ret.= "<span itemprop=\"locality\">".$tags['city']."</span>";
    $ret .= "</span>";

    if(isset($tags['contact:phone']))
      $ret .="<span itemprop=\"tel\">".$tags['contact:phone']."</span>";

    if(isset($tags['contact:website']))
      $ret .="<span itemprop=\"url\">".$tags['contact:website']."</span>";

    $ret .= "<br/><br/>";
    foreach ($tags as $key => $value) {
      $ret.=$key."  =  ".$value."<br/>";
    }
  }else
    $ret.="<br/><h4><a href='?id=".$id."#!18/".$lat."/".$lon."/".$type."'>".$tags['name']."</a></h4><br/>";
    
  $ret.="Id: ".$id."<br/>";
  return $ret;
}


$title="";
$content="";
if(isset($_GET['id'])){
  $query="[out:json];node(".$_GET['id'].");out;";
  $url="http://overpass.osm.rambler.ru/cgi/interpreter?data=".$query;
  $con=json_decode(file_get_contents($url),true);
  $tags=$con["elements"][0]["tags"];
  $content=$content . print_poi($tags,$con["elements"][0]['lat'],$con["elements"][0]['lon'],$con["elements"][0]['id'],'');
  $title=$tags['name'];
}else{
  $a=explode("/",$_GET['_escaped_fragment_']);
  $lat=round($a[1],2);
  $lon=round($a[2],2);
  $delta=0.005;
  //$title=" list - ".$lat." ".$lon;
  $content.="<a href='index.php#!16/".($lat+($delta*2))."/".($lon)."/'>Move up</a><br/>";
  $content.="<a href='index.php#!16/".($lat-($delta*2))."/".($lon)."/'>Move down</a><br/>";
  $content.="<a href='index.php#!16/".($lat)."/".($lon-($delta*2))."/'>Move left</a><br/>";
  $content.="<a href='index.php#!16/".($lat)."/".($lon+($delta*2))."/'>Move right</a><br/>";

  $content.="<a href='index.php'>osm24</a><br/>";
  //Options
  $options=array();
  for($i=0;$i<count($a);$i++){
    $b=explode('=',$a[$i]);
    $options[$b[0]]=$b[1];
  }
  $bbox="(".($lat-$delta).",".($lon-$delta).",".($lat+$delta).",".($lon+$delta).")";
  $query="";
  if($options['type']=='eat'){
    $query="[out:json];(node".$bbox."[amenity='restaurant'];node".$bbox."[amenity='fast_food'];node".$bbox."[amenity='cafe'];);out;";
  }else if($options['type']=='party'){
    $query="[out:json];(node".$bbox."[amenity='pub'];node".$bbox."[amenity='bar'];node".$bbox."[amenity='nightclub'];node".$bbox."[amenity='biergarten'];node".$bbox."[amenity='stripclub'];);out;";
  }else if($options['type']=='excercise'){
    $query="[out:json];(node".$bbox."[sport]);out;";//TODO
  }else if($options['type']=='buy'){
    $query="[out:json];(node".$bbox."[shop];node".$bbox."[amenity='pharmacy'];);out;";
  }else if($options['type']=='craft'){
    $query="[out:json];(node".$bbox."[craft]);out;";
  }else if($options['type']=='office'){
    $query="[out:json];(node".$bbox."[office]);out;";
  }else{
    $query="[out:json];(node".$bbox."[amenity='restaurant'];node".$bbox."[amenity='fast_food'];node".$bbox."[amenity='cafe'];node".$bbox."[amenity='pub'];node".$bbox."[amenity='bar'];node".$bbox."[amenity='nightclub'];node".$bbox."[amenity='stripclub'];node".$bbox."[amenity='biergarden'];node".$bbox."[amenity='sport'];node".$bbox."[amenity='office'];node".$bbox."[amenity='craft'];node".$bbox."[amenity='shop'];);out;";
  }

  $url="http://overpass.osm.rambler.ru/cgi/interpreter?data=".$query;
  $con=json_decode(file_get_contents($url),true);
  for($i=0;$i<count($con["elements"]);$i++){
    $tags=$con["elements"][$i]["tags"];
    $content=$content . print_poi($tags,$con["elements"][$i]['lat'],$con["elements"][$i]['lon'],$con["elements"][$i]['id'],$options['type']);
  }
}
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="description" content="POI map with opening hours for <?php echo $title; ?>">
    <meta name="author" content="dotevo">
    <meta name="fragment" content="!">
    <title>Find <?php echo $title; ?> </title>
  </head>
<body>
<h1>Your favorite places on the map. Opening hours.</h1><br/>
<?php
echo $content;
?>
<br/><br/>The data included in this document is from www.openstreetmap.org. The data is made available under ODbL.<br/>This website uses Overpass API. Dotevo
</body>
</html>
