var shop_icons=["alcohol",'antiques',"art","baby_goods","bag","bakery","beauty","bicycle","books","boutique","butcher","car","car_parts","car_repair","chemist","clothes","computer","confectionery","convenience","copyshop","dog_hairdresser","doityourself","fabric","farm","fishing","florist","funeral_directors","furniture","garden_centre","gift","greengrocer","haberdashery","hairdresser","hardware","hearing_aids","interior_decoration","jewelry","kiosk","mall","mobile_phone","motorcycle","music","musical_instruments","newsagent","optician","pet","second_hand","shoes","seafood","supermarket","tobacco","toys","travel_agency","tyres","video"];
var leisure_icons=['pitch','swimming_pool','stadium','track','sports_centre'];
var amenity_icons=['atm','toilets','drinking_water','shelter','bar','bank','pub','restaurant','fast_food','fuel','cafe','nightclub','pharmacy','biergarten','stripclub','ice_cream'];
var office_icons=[];
var craft_icons=['key_cutter','clockmaker','glaziery','photographer','shoemaker','tailor'];
var emergency_icons=['defibrillator'];


Date.prototype.addHours= function(h){
    this.setHours(this.getHours()+h);
    return this;
}

L.LatLngBounds.prototype.toOverpassBBoxString = function (){
  var a = this._southWest,
      b = this._northEast;
  return [a.lat, a.lng, b.lat, b.lng].join(",");
}

function EasyOverpass(options){
  this.options=options;
  this._ids={};
  map.on('moveend', this.onMoveEnd, this);

}

EasyOverpass.prototype.addElement = function(e){
  if (e.id in this._ids){ return;}
  this._ids[e.id] = true;
  var pos = new L.LatLng(e.lat, e.lon);
  var now = new Date();
  var next_hour = (new Date().addHours(1));
  var oh;
  var shadow="nd";

  if(typeof e.tags === 'undefined'){console.log(e); return;}
  if(e.tags.hasOwnProperty("opening_hours")){
    try{
      oh = new opening_hours(e.tags['opening_hours']);}
    catch(err){
      console.log("Unsupported:" + e.tags['opening_hours']);
      oh=undefined;
    }       
  }

  //Opening hours
  if(e.tags.hasOwnProperty("opening_hours")&&typeof oh != 'undefined'){
    var is_open = oh.getState(now);
    shadow="closed";
    if(is_open==true){
      is_open = oh.getState(next_hour);
      shadow="last";
      if(is_open==true){            
        shadow="open";
      }
    }
  }

  var name="Unnamed";
  if(e.tags.hasOwnProperty("name"))
    name=e.tags["name"];
  else if(e.tags.hasOwnProperty("ref"))
    name=e.tags["ref"];

  var icon_name="null";
  if(e.tags.hasOwnProperty("amenity")&&amenity_icons.indexOf(e.tags["amenity"]) != -1){
    icon_name="amenity_"+e.tags["amenity"];
  }else if(e.tags.hasOwnProperty("shop")&&shop_icons.indexOf(e.tags["shop"]) != -1){
      icon_name="shop_"+e.tags["shop"];
  }else if(e.tags.hasOwnProperty("leisure")&&leisure_icons.indexOf(e.tags["leisure"]) != -1){
      icon_name="leisure_"+e.tags["leisure"];
  }else if(e.tags.hasOwnProperty("emergency")&&emergency_icons.indexOf(e.tags["emergency"]) != -1){
      icon_name="emergency_"+e.tags["emergency"];
  }else if(e.tags.hasOwnProperty("office")&&office_icons.indexOf(e.tags["office"]) != -1){
      icon_name="office_"+e.tags["office"];
  }else if(e.tags.hasOwnProperty("craft")&&craft_icons.indexOf(e.tags["craft"]) != -1){
      icon_name="craft_"+e.tags["craft"];
  }
  
  if(icon_name==="null")
    icon_name="other";
  m_icon = L.divIcon({
    className: "map-icon map-icon-"+shadow,html:"<div class='map-icon' style='background-image: url(img/icons/"+icon_name+".png);'></div>",
    iconSize: [32, 37],
  });

  var VAL = this.options.poiInfo(e,oh);
  var popup = VAL[0];
  ga('send', 'pageview', {
             'page': VAL[1],
             'title': 'Popup'
              });
  var marker=new L.marker(pos, {
    icon: m_icon,riseOnHover: true
  }).bindLabel(name)
    .bindPopup(popup, {minWidth: 300});
  marker.on("click",function(){
     this.label.close();

DISQUS.reset({
  reload: true,
  config: function () {  
    this.page.identifier = e.id+"";  
    this.page.url = VAL[1];
  }
});
  },marker);
  this.options.layer.addLayer(marker);
  //console.log(permalink_object_id + " "+e.id);
  if(typeof permalink_object_id != 'undefined' && e.id == permalink_object_id){
    map.panTo(marker.getLatLng());
    marker.fire('click');
    console.log("FIRE");//delete permalink_object_id;
  }
  if(this.options.minfullzoom<=this.options.map.getZoom()){
    $("#info").html("");
  }
}

EasyOverpass.prototype.dataDownloadWays = function(data){
  if (typeof this.instance.options.layer === 'undefined') {
    console.error("_map == null");return;
  }
  if(this.query!=this.instance.options.queryWays){
    console.log("Different");return;
  }

  var nodes={};
  for(var i=0;i<data.elements.length;i++) {
    if(data.elements[i].type==="node")
      nodes[data.elements[i].id]=data.elements[i];
  }
  for(var i=0;i<data.elements.length;i++){
     if(data.elements[i].type==="way"){
       var lon=0;
       var lat=0;
       var j=0;
       for(var node in data.elements[i].nodes){
         var n=data.elements[i].nodes[node];
         lon+=nodes[n].lon;
         lat+=nodes[n].lat;
         j++;
       }
       lon/=j;
       lat/=j;
       el={id:"w"+data.elements[i].id,tags:data.elements[i].tags,lon:lon,lat:lat};  
       this.instance.addElement(el);
     }
  }
}

EasyOverpass.prototype.dataDownloadNodes = function(data){
console.log(this.query);
  if (typeof this.instance.options.layer === 'undefined') {
    console.error("_map == null");return;
  }
  if(this.query!=this.instance.options.query && this.query!="perm"){
    console.log("Different");return;
  }

  for(i=0;i<data.elements.length;i++) {
     this.instance.addElement(data.elements[i]);
  }
}

EasyOverpass.prototype.onMoveEnd = function(){
  var out="out 40;";
  if(this.options.minfullzoom<=this.options.map.getZoom()){
     out="out;"
     $("#info").html("Loading...");
  }else{
    $("#info").html("Please, zoom in.");
  }
  if(this.options.minzoom>this.options.map.getZoom()){ 
  return;
  }

  if(this.options.query!=""){
    var query_a=this.options.query+out;
    console.log("Query: "+query_a);
    query_a=query_a.replace(/(BBOX)/g, this.options.map.getBounds().toOverpassBBoxString());
    $.ajax({
      url: query_a,
      context: { instance: this, query: this.options.query },
      crossDomain: true,
      dataType: "json",
      data: {},
      success: this.dataDownloadNodes
    });
  }
if(this.options.minfullzoom<=this.options.map.getZoom()){
  if(this.options.queryWays!=""){
    var query_a=this.options.queryWays+out+'(._;>;);out;';
    console.log("Query: "+query_a);
    query_a=query_a.replace(/(BBOX)/g, this.options.map.getBounds().toOverpassBBoxString());
    $.ajax({
      url: query_a,
      context: { instance: this, query: this.options.queryWays },
      crossDomain: true,
      dataType: "json",
      data: {},
      success: this.dataDownloadWays
    });
  }}
}

EasyOverpass.prototype.downloadID = function(){
   console.log("ID");
   if(typeof permalink_object_id != 'undefined'){
    var out=url+"data=[out:json];";
    if(permalink_object_id[0] != 'w'){
      out+="node("+permalink_object_id+");out;";
      console.log(out);
      $.ajax({
      url: out,
      context: { instance: this, query: "perm" },
      crossDomain: true,
      dataType: "json",
      data: {},
      success: this.dataDownloadNodes
      });
    }
    else{
       console.log(out);
       var a=permalink_object_id.substring(1);
       out+="way("+a+");out;(._;>;);out;";
             $.ajax({
      url: out,
      context: { instance: this, query: "perm" },
      crossDomain: true,
      dataType: "json",
      data: {},
      success: this.dataDownloadWays
      });
    }    
  }
}

EasyOverpass.prototype.clear = function(){
  this.options.layer.clearLayers();
  this._ids={};
}
