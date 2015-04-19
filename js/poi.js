var shop_icons=["alcohol",'antiques',"art",
"baby_goods","bag","bakery","beauty","bicycle","books","boutique","butcher",
"car","car_parts","car_repair","chemist","clothes","computer","confectionery","convenience","copyshop",
"dog_hairdresser","doityourself",
"fabric","farm","fishing","florist","funeral_directors","furniture",
"garden_centre","gift","greengrocer",
"haberdashery","hairdresser","hardware","hearing_aids",
"interior_decoration","jewelry","kiosk","mall","mobile_phone","motorcycle","music","musical_instruments",
"newsagent","optician","pet","second_hand","shoes","seafood","supermarket","tobacco","toys","travel_agency","tyres","video"];
var leisure_icons=['pitch','swimming_pool','stadium','track','sports_centre'];
var amenity_icons=['atm','bar','bank','biergarten','cafe','cinema','clinic','college','dentist','doctors','drinking_water',
'fast_food','fuel','hospital','ice_cream','kindergarten','library','nightclub',
'pub','pharmacy','restaurant','school','shelter','social_facility','stripclub','theatre','toilets','university','veterinary'];
var office_icons=[];
var craft_icons=['key_cutter','clockmaker','glaziery','photographer','shoemaker','tailor'];
var emergency_icons=['ambulance_station','defibrillator'];
var tourism_icons=['guest_house','motel','hotel','caravan_site','camp_site','information','attraction','theme_park','zoo','museum','artwork'];


var global_nominatim = "";

function POI(element){
  this.element = element;
  this.nominatim = undefined;
  //this.updateShadow(new Date());
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
        ret+=((typeof opt.desc != 'undefined') ? '<i>'+opt.desc+'</i>' : "");
        ret+="<ul>"
      }
      added++;
      for (var j = 0; j < items.length; ++j){
        ret += "<li>";

        if(typeof opt.href != 'undefined'){
          if(typeof opt.hrefFunc != 'undefined'){
            ret += '<a href="'+opt.hrefFunc(items[j])+'">';
          }else{
            ret += '<a href="'+opt.href+items[j]+'">';
          }
        }

        if(typeof opt.name != 'undefined')
          ret += opt.name;
        else
          ret += items[j];

        if(typeof opt.href != 'undefined'){
          ret += "</a>";
        }

        ret += "</li>"
      }
    }
  }
  if(added > 0)
    ret+="</ul><br/>";
  return ret;
};

var months = ['Jan', 'Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
var weekdays = ['Mo','Tu','We','Th','Fr','Sa','Su'];
function pad(n) { return n < 10 ? '0'+n : n; }

// See https://github.com/ypid/opening_hours.js/blob/master/js/opening_hours_table.js.
POI.prototype.drawTable = function(oh, date_today) {
  var date_today = new Date(date_today);
  date_today.setHours(0, 0, 0, 0);

  var date = new Date(date_today);
  date.setDate(date.getDate()-1);
  var table = [];
  for (var row = 0; row < 7; row++) {
    date.setDate(date.getDate()+1);
    
    var state = oh.getState(date);
    var prevdate = date;
    var curdate = date;
    table[row] = {
      date: new Date(date),
      times: '',
      text: []
    };
    while (curdate.getTime() - date.getTime() < 24*60*60*1000) {
      curdate = oh.getNextChange(curdate);
      if(typeof curdate === 'undefined')return "";//Fixme: workaround
      var fr = prevdate.getTime() - date.getTime();
      var to = curdate.getTime() - date.getTime();
      if (to > 24*60*60*1000)
        to = 24*60*60*1000;
      fr *= 100/1000/60/60/24;
      to *= 100/1000/60/60/24;
      table[row].times += '<div class="timebar ' + (state?'open':'closed') + '" style="width:' + (to-fr) + '%"></div>';
      if (state) {
        var text = prevdate.getHours() + ':' + pad(prevdate.getMinutes()) + ' - ';
        if (prevdate.getDay() != curdate.getDay())
          text += '24:00';
        else
          text += curdate.getHours() + ':' + pad(curdate.getMinutes());
        table[row].text.push(text);
      }
      prevdate = curdate;
      state = !state;
    }
  }
  ret='<table>';
  for (var row in table) {
    var today = table[row].date.getDay() == date_today.getDay();
    var endweek = ((table[row].date.getDay() + 1) % 7) == date_today.getDay();
    var cl = today ? ' class="today"' : endweek ? ' class="endweek"' : '';

    ret+='<tr' + cl + '><td class="day ' + (table[row].date.getDay() % 6 == 0 ? 'weekend' : 'workday') + '" width="100px">';
    ret+=months[table[row].date.getMonth()] +' '+table[row].date.getDate();
    ret+='</td><td class="times">';
    ret+=table[row].times;
    ret+='</td><td width="150px">';
    ret+=table[row].text.join(', ') || '&nbsp;';
    ret+='</td></tr>';
  }
  ret+='</table>';
  return ret;
};

POI.prototype.getInfoBox = function(){
  var name=this.getName();

  var tabs='<ul class="nav nav-tabs" id="poiTab"><li class="active"><a href="#basic" data-toggle="tab">'+lang_basic+'</a></li>';
  //If opening hours exist
  if(typeof this.oh != 'undefined' && this.element.tags.hasOwnProperty("opening_hours"))
    tabs+='<li><a href="#hours" data-toggle="tab">'+lang_opening_hours+'</a></li>';

  tabs+='<li><a href="#comments" data-toggle="tab">'+lang_comments+'</a></li>';
  tabs+='<li><a href="#tags" data-toggle="tab">'+lang_advanced+'</a></li></ul>';

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

  content += this.__genItems({tag:['contact:facebook'],icon:'glyphicon glyphicon-globe',name:"Facebook",href:'',hrefFunc: 
    function(nn){return ((nn.indexOf('/') === -1)?"http://facebook.com/":"")+nn;}});

  content += this.__genItems({tag:['cuisine']});
  content += this.__genItems({tag:['sport']});
  content+='</div>';


      content+='<br/><br/><a onclick="showNoteMessage(\''+lang_report+'\',note_body,function n(){add('+this.element.lon+','+this.element.lat+",'"+name.replace('\'','/')+"'"+');},'+this.element.lon+','+this.element.lat+')">'+lang_add_missing_data+'</a></div>'      
      //hours
      if(typeof this.oh != 'undefined' && this.element.tags.hasOwnProperty("opening_hours")){
        content+='<div class="tab-pane" id="hours">';
        if(this.element.tags['opening_hours']=="24/7")
            content+="24h<br/>";
        else
            content+=this.drawTable(this.oh, new Date());
        content+='<a href="https://github.com/ypid/opening_hours.js/commits/master/demo.html">Author</a></div>';
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
};

POI.prototype.getIconSource = function(){
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
  }else if(this.element.tags.hasOwnProperty("tourism")&&tourism_icons.indexOf(this.element.tags["tourism"]) != -1){
      icon_name="tourism_"+this.element.tags["tourism"];
  }
  
  if(icon_name==="null")
    icon_name="other";
  return icon_name;
};

POI.prototype.getIconDiv = function(){
  var icon_name = this.getIconSource();
  return "<div class='map-icon map-icon-"+this.shadow+"'><div class='map-icon' style='background-image: url(img/icons/"+icon_name+".png);'></div></div>";
};

POI.prototype.getIcon = function(){
  var icon_name = this.getIconSource();

  return L.divIcon({
    className: "map-icon map-icon-"+this.shadow,html:"<div class='map-icon' style='background-image: url(img/icons/"+icon_name+".png);'></div>",
    iconSize: [32, 37],
    iconAnchor: [16, 37],
  });
};

POI.prototype.getName = function(){
  var name="Unnamed";
  if(this.element.tags.hasOwnProperty("name"))
    name=this.element.tags["name"];
  else if(this.element.tags.hasOwnProperty("ref"))
    name=this.element.tags["ref"];
  else if(this.element.tags.hasOwnProperty("operator"))
    name=this.element.tags["operator"];
  return name;
};

POI.prototype.updateShadow = function (now){	
	var old=this.shadow;
	var next_hour = ((new Date(now)).addHours(1));
	this.oh;
	this.shadow = "nd";
	if (this.element.tags.hasOwnProperty("opening_hours")) {
		try {
			this.oh = new opening_hours(this.element.tags['opening_hours'], global_nominatim);
		} catch (err) {
			console.log("Unsupported:" + this.element.tags['opening_hours']);
			this.oh = undefined;
		}
		// Status
		if (typeof this.oh != 'undefined') {
			var is_open = this.oh.getState(now);
			this.shadow = "closed";
			if (is_open == true) {
				is_open = this.oh.getState(next_hour);
				this.shadow = "last";
				if (is_open == true) {
					this.shadow = "open";
				}
			}
		}
	}
	if(this.shadow==old)
		return false;
	return true;
};
