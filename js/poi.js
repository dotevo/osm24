var shop_icons=["alcohol",'antiques',"art","baby_goods","bag","bakery","beauty","bicycle","books","boutique","butcher","car","car_parts","car_repair","chemist","clothes","computer","confectionery","convenience","copyshop","dog_hairdresser","doityourself","fabric","farm","fishing","florist","funeral_directors","furniture","garden_centre","gift","greengrocer","haberdashery","hairdresser","hardware","hearing_aids","interior_decoration","jewelry","kiosk","mall","mobile_phone","motorcycle","music","musical_instruments","newsagent","optician","pet","second_hand","shoes","seafood","supermarket","tobacco","toys","travel_agency","tyres","video"];
var leisure_icons=['pitch','swimming_pool','stadium','track','sports_centre'];
var amenity_icons=['atm','toilets','drinking_water','shelter','bar','bank','pub','restaurant','fast_food','fuel','cafe','nightclub','pharmacy','biergarten','stripclub','ice_cream'];
var office_icons=[];
var craft_icons=['key_cutter','clockmaker','glaziery','photographer','shoemaker','tailor'];
var emergency_icons=['defibrillator'];

function POI(element){
  this.element = element;
}

POI.prototype.__genItems = function(opt){
  if(typeof opt.tag === 'undefined')
    return "";

  var added = 0;
  var ret = "";
  //If more then one tag to icon
  for (var i = 0; i < opt.tag.length; ++i){
    if(this.element.tags.hasOwnProperty(opt.tag[i])){
      var items = this.element.tags[opt.tag[i]].split(";");
      //First item
      if(added==0){
        ret+=((typeof opt.icon != 'undefined') ? '<i class="'+opt.icon+'"></i>' : "");
        ret+="<ul>"
      }
      added++;
      for (var j = 0; j < items.length; ++j){
        ret += "<li>";
        if(typeof opt.href != 'undefined'){
          ret += '<a href="'+opt.href+items[j]+'">';
          ret += items[j];
          ret += "</a>";
        }else{
          ret += items[j];
        }
        ret += "</li>"
      }
    }
  }
  if(added > 0)
    ret+="</ul><br/>";
  return ret;
}

POI.prototype.getInfoBox = function(){
  var name=this.getName();

  var tabs='<ul class="nav nav-tabs" id="poiTab"><li class="active"><a href="#basic" data-toggle="tab">'+lang_basic+'</a></li>';
  //If opening hours exist
  if(typeof opening != 'undefined' && this.element.tags.hasOwnProperty("opening_hours"))
    tabs+='<li><a href="#hours" data-toggle="tab">'+lang_opening_hours+'</a></li>';

  tabs+='<li><a href="#comments" data-toggle="tab">Comments</a></li>';
  tabs+='<li><a href="#tags" data-toggle="tab">Advanced</a></li></ul>';

  var content = '<div class="tab-content">';
  //------basic
  content+='<div class="tab-pane active container" id="basic" style="margin:0px;width:400px">';

  //name
  content+='<h4><a href=\'http://osm24.eu/index.php?id='+this.element.id+'#!18/'+this.element.lat+'/'+this.element.lon+'/\'>' +((this.element.tags.hasOwnProperty("name")) ? this.element.tags["name"]:"----")+'</a><div id="plusone-div" data-size="small" data-href=\'http://osm24.eu/index.php?id='+this.element.id+'#!18/'+this.element.lat+'/'+this.element.lon+'/\'></div></h4>';
  //addr
  content+='<small>'+((this.element.tags.hasOwnProperty("addr:city")) ? this.element.tags["addr:city"]+', ' : "")+((this.element.tags.hasOwnProperty("addr:street")) ? this.element.tags["addr:street"]+', ' : "")+((this.element.tags.hasOwnProperty("addr:housenumber")) ? this.element.tags["addr:housenumber"]+', ' : "")+'</small>';

  //net
  content+='<div>';
  content += this.__genItems({tag:['contact:email','email'],icon:'glyphicon glyphicon-envelope',href:'mailto:'});
  content += this.__genItems({tag:['contact:phone','phone'],icon:'glyphicon glyphicon-phone-alt',href:'tel:'});
  content += this.__genItems({tag:['contact:website','website'],icon:'glyphicon glyphicon-globe',href:''});

  content += this.__genItems({tag:['cuisine']});
  content += this.__genItems({tag:['sport']});
  content+='</div>';


      content+='<br/><br/><a onclick="showNoteMessage(\''+lang_report+'\',note_body,function n(){add('+this.element.lon+','+this.element.lat+",'"+name+"'"+');},'+this.element.lon+','+this.element.lat+')">'+lang_add_missing_data+'</a></div>'      
      //hours
      if(typeof opening != 'undefined' && e.tags.hasOwnProperty("opening_hours")){
        content+='<div class="tab-pane" id="hours">';
        if(e.tags['opening_hours']=="24/7")
            content+="24h<br/>";
        //else
          //  content+=drawTable(opening, new Date());
        content+='<a href="https://github.com/AMDmi3/opening_hours.js/commits/master/demo.html">Author</a></div>';
      }

      //comments
      content+='<div class="tab-pane" id="comments"><div id="disqus_thread"></div></div>';

      //tags
      content+='<div class="tab-pane" id="tags"><table border=1>';
      content+="<tr><th><b>"+lang_key+"</b></th><th><b>"+lang_value+"</b></th></tr>";
      for (key in this.element.tags)
        content+='<tr><td>'+key+'</td><td> <i>'+this.element.tags[key]+'</i></td></tr>';
      
      content+='</table>';
      if(this.element.id[0]!='w')
        content+="<a href='http://www.openstreetmap.org/node/"+this.element.id+"' target='_blank'>Open OSM</a>";
      else
        content+="<a href='http://www.openstreetmap.org/way/"+this.element.id.substr(1)+"' target='_blank'>Open OSM</a>";

      content+='</div>';


      content+='</div>';
      //link
      var link = '<iframe scrolling="no" style="border: 0; width: 234px; height: 60px;" src="//coinurl.com/get.php?id=27504&SSL=1"></iframe>';
      var container = $('<div />');
      container.html('<div class="tabbable tabs-below">'+content+tabs+'</div>'+link);
      return [container[0], 'http://osm24.eu/index.php?id='+this.element.id+'#!18/'+this.element.lat+'/'+this.element.lon+'/' ];
}

POI.prototype.getIcon = function(){
  var now = new Date();
  var next_hour = (new Date().addHours(1));
  var oh;
  var shadow="nd";

  if(typeof this.element.tags === 'undefined'){console.log(e); return;}

  if(this.element.tags.hasOwnProperty("opening_hours")){
    try{
      oh = new opening_hours(this.element.tags['opening_hours']);}
    catch(err){
      console.log("Unsupported:" + this.element.tags['opening_hours']);
      oh=undefined;
    }
  }

  //Opening hours
  if(this.element.tags.hasOwnProperty("opening_hours")&&typeof oh != 'undefined'){
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

  var icon_name="null";
  if(this.element.tags.hasOwnProperty("amenity")&&amenity_icons.indexOf(this.element.tags["amenity"]) != -1){
    icon_name="amenity_"+this.element.tags["amenity"];
  }else if(this.element.tags.hasOwnProperty("shop")&&shop_icons.indexOf(this.element.tags["shop"]) != -1){
      icon_name="shop_"+this.element.tags["shop"];
  }else if(this.element.tags.hasOwnProperty("leisure")&&leisure_icons.indexOf(this.element.tags["leisure"]) != -1){
      icon_name="leisure_"+this.element.tags["leisure"];
  }else if(this.element.tags.hasOwnProperty("emergency")&&emergency_icons.indexOf(this.element.tags["emergency"]) != -1){
      icon_name="emergency_"+this.element.tags["emergency"];
  }else if(this.element.tags.hasOwnProperty("office")&&office_icons.indexOf(this.element.tags["office"]) != -1){
      icon_name="office_"+this.element.tags["office"];
  }else if(this.element.tags.hasOwnProperty("craft")&&craft_icons.indexOf(this.element.tags["craft"]) != -1){
      icon_name="craft_"+this.element.tags["craft"];
  }
  
  if(icon_name==="null")
    icon_name="other";

  return L.divIcon({
    className: "map-icon map-icon-"+shadow,html:"<div class='map-icon' style='background-image: url(img/icons/"+icon_name+".png);'></div>",
    iconSize: [32, 37],
    iconAnchor: [16, 37],
  });
}

POI.prototype.getName = function(){
  var name="Unnamed";
  if(this.element.tags.hasOwnProperty("name"))
    name=this.element.tags["name"];
  else if(this.element.tags.hasOwnProperty("ref"))
    name=this.element.tags["ref"];
  else if(this.element.tags.hasOwnProperty("operator"))
    name=this.element.tags["operator"];
  return name;
}
