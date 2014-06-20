var url="http://overpass-api.de/api/interpreter?";
//var url="http://overpass.osm.rambler.ru/cgi/interpreter?";
var n=false;
function getTagArray(tag,typetag,excludetag){
  //To do few combinations
  if(typeof typetag==='undefined') typetag="normal";
  if(typeof excludetag==='undefined') excludetag=[];
  else
    excludetag = excludetag.split("@");
  
  var p=tag.split("@");
  if(p.length>1){
    var a=[];
    for(var n in p)
      a.push({tag:p[n],type:typetag,exclude:excludetag });
    return a;
  }
  return [{tag:tag,type:typetag,exclude:excludetag }];
}

function getTagFromElement(el,state){
  //Tag-pair=null - means no value
  var typetag=el.data("tag-type");
  var fulltag=el.data("tag-pair");
  var excludetag=el.data("tag-exclude");
  if(fulltag=="$$") return "";
  //Visible=false - hidden (null)

  if(el.attr('id')=="int_yes"){
    console.log(el.closest(".main"));
  }
  if(el.closest(".dropdown").css('display')=="none") {return "";}
  if(el.parent().css('display')=="none") return "";
  if(el.closest(".main").css('display')=="none") return "";

  //Tag-pair=* return tag
  if(typeof fulltag!='undefined') return getTagArray(fulltag,typetag,excludetag);
  //If multistate get tag-pair-state value 
  if(state!=-1){
    fulltag=el.data("tag-pair-s"+state);
    if(typeof fulltag!='undefined') return getTagArray(fulltag,typetag,excludetag);
  }
  //INIT
  var valuetag=el.data("tag-value");
  var keytag=el.data("tag-key");
  if(typeof keytag==='undefined'&&el.closest(".tag-parent").length>0)
    keytag=el.closest(".tag-parent").data("tag-key");
  var chartag=el.data("tag-char");
  if(typeof chartag==='undefined') 
    el.closest(".tag-parent").data("tag-char");
  if(typeof chartag==='undefined') chartag="=";

  //if tag-key does not exists
  if(typeof keytag==='undefined')  return "";
  //if tag-value is defined
  if(typeof valuetag!='undefined'){
    if(valuetag=="@")//if value is from input
      return getTagArray("['"+keytag+"'"+chartag+"'"+el.val()+"']",typetag,excludetag);

    //other case
    return getTagArray("['"+keytag+"'"+chartag+"'"+valuetag+"']",typetag,excludetag);
  }
  //use ID becouse tag-value not found
  return getTagArray("['"+keytag+"'"+chartag+"'"+el.attr("id")+"']",typetag,excludetag);
}

//FIXME
function tagsjoin(tags,newt){
  if(newt==="")return tags;
  if(tags==="")tags=[];
  for(var key in newt){
    tags.push(newt[key]);
  }
  return tags;
}

function getTags(from,parent){
  var tags=[];
  for(var key in from){
    if(typeof global_menu_data[key] === 'object'){
      tags=tagsjoin(tags,getTags(from[key],key));
    }else{
      if(typeof from[key]==='string' && from[key]!=""){
        //Values
        var p=$('.global-menu-data #'+from[key]);
        if(p.length>0){
          tags=tagsjoin(tags,getTagFromElement(p,-1));
        }else{
          p=$('.global-menu-data #'+key);
          if(p.length>0){
            tags=tagsjoin(tags,getTagFromElement(p,from[key]));
          }
        }
      }else if(typeof from[key]==='number'){
        var p=$('.global-menu-data #'+key);
        if(p.length>0){
          tags=tagsjoin(tags,getTagFromElement(p,from[key]));
        }
      }
    }
  }
  return tags;
}


function getQuery(){
  var tags=getTags(global_menu_data,"");
  var tagarr=[];
  for(var key in tags){
    if(tags[key].type=="main"){
      var str=tags[key].tag;
      for(var key2 in tags){
        if(tags[key2].type!="main"){
          var exclude=false;
          for(var pp in tags[key2].exclude)
            if(tags[key].tag==tags[key2].exclude[pp])
              exclude=true;
          if(!exclude)
            str+=tags[key2].tag;
        }
      }
      tagarr.push(str);
    }
  }
  var query="data=[out:json];(";
  for(var key in tagarr)
    query+="DATATYPE(BBOX)"+tagarr[key]+";";
  query+=");";
  return url+query;
}


var $msg2Modal = $('#dynModal').modal({
      backdrop: false,
      show: false,
      keyboard: false
    });

function showMessage(header, body, callback) {
    $msg2Modal
      .find('.modal-header > h3').text(header).end()
      .find('.modal-body').html($.parseHTML( body )).end()
      .find('.callback-btn').off('click.callback')
        .on('click.callback', callback).end()
      .modal('show');
}

function showNoteMessage(header,body,callback,lon,lat){
  var delta=0.001;
  console.log(lon+" :" +lat);
  $.ajax({
    url: "http://api.openstreetmap.org/api/0.6/notes.json",
    data: {bbox: ''+(lon-delta)+','+(lat-delta)+','+(lon+delta)+','+(lat+delta)},
    success: function(data){
       var n=$msg2Modal.find("#notes-message");
       var html='<table class="table table-condensed"><tr><th>id</th><th>'+lang_status+'</th><th>'+lang_note+'</th></tr>';
       var added=0;
       $.each( data.features, function( val ) {
         var prop=data.features[val].properties;
         var badge='<span class="badge glyphicon glyphicon-ok-sign" style="background-color:#4ab948;">';
         var status="success";
         if(prop.status=="open"){
           badge='<span class="badge glyphicon glyphicon-remove-sign" style="background-color:#b94a48;">';
           status="danger";
         }
         html+='<tr class="'+status+'"><td><a href="http://www.openstreetmap.org/browse/note/'+prop.id+'"  target="_blank">'+prop.id+'</a></td><td>'+badge+prop.status+'</span></td><td>'+prop.comments[0].html+'</a></td>';
         added=1;
       });
  
       html+="</table>";
       if(added==1)
         n.html(html);
       else
         n.html(lang_not_found);
    },
    dataType: "json"
  });
  showMessage(header, body, callback);
}

//*****************************NOTES********************************

function add(lonv,latv,name){
  $.ajax({
    url: "http://osm24.eu/add_note.php",
    data: {lon:lonv,lat:latv,text:"("+name+") "+$( "#text1").val()},
    success: function(data){$msg2Modal.modal('hide')},
  });
}

var easyOverpass;
var nn=0;
function ustaw(){
  if(!n)return;
  var a=getQuery();
  easyOverpass.options.query=a.replace(/(DATATYPE)/g, 'node');
  easyOverpass.options.queryWays=a.replace(/(DATATYPE)/g, 'way');
  easyOverpass.clear();
  if(typeof permalink_object_id != 'undefined' && nn==0){
    easyOverpass.downloadID();nn=1;
  }
  easyOverpass.onMoveEnd();
}

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

var months = ['Jan', 'Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
var weekdays = ['Mo','Tu','We','Th','Fr','Sa','Su'];
function pad(n) { return n < 10 ? '0'+n : n; };
function drawTable(oh, date_today) {
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
}


//------------------------------  READY  ----------------------------------------------
var map;
var location_marker;
var location_circle;

    var disqus_shortname = 'gdzieblee'; 


    (function() {
        var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
        dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
    })();


function onLocationFound(e) {
  console.log(locate+":");
  if(locate==3){map.stopLocate();return;}
  var radius = e.accuracy / 2;
  if(typeof location_marker != 'undefined')
    map.removeLayer(location_marker);
  if(typeof location_circle != 'undefined')
    map.removeLayer(location_circle);

  location_marker = new L.circleMarker(e.latlng, {color: '#136AEC', fillColor: '#2A93EE',fillOpacity: 0.7, weight: 2,opacity: 0.9, radius: 4})
  map.addLayer(location_marker);
  location_circle = new L.circle(e.latlng,radius , {color: '#136AEC', fillColor: '#136AEC',fillOpacity: 0.05,  weight: 2, opacity: 0.5,radius: radius*2 })
  map.addLayer(location_circle);
  $("#locate-button").text(lang_stop_locate);
  console.log("aaa");
  console.log(locate);
  if(locate==0){
    locate=1;
    //map.locate({maxZoom: 16, watch: true, enableHighAccuracy: true, maximumAge: 30000, timeout: 3000000});
  }
}

function onLocationError(e) {
  alert(e.message);
}

function report_poi (e) {
  showNoteMessage(lang_report,note_body,function n(){
         add(e.latlng.lng, e.latlng.lat,'Main report');
    },e.latlng.lng,e.latlng.lat);
}

var locate=0;

$(window).load(function() {
  map = new L.Map('map',{
    contextmenu: true,
    contextmenuWidth: 140,
    contextmenuItems: [{
      text: 'Report data',
      callback: report_poi
    }]
  }).setView([51.505, 21], 7);
  if(global_menu_data['type']==="undefined")
     global_menu_data['type']='all';
  var modal = $('#myModal')
  //modal.modal('show'); 
  $('#mapper').removeAttr("checked");

  var attrib = 'ODbL OpenStreetMap, Data: <a href="http://www.overpass-api.de/">OverpassAPI</a>"';
  var osm = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 19, subdomains: 'abc', attribution: attrib,   detectRetina: true});

/*              URL_UPDATE           */
  map.params_url={};
  map.params_url_updated=function(){
    for(var key in map.params_url){
      var args = map.params_url[key].split(";");
      if(args.length > 1){
        global_menu_data[key]={};
        for(var key2 in args){
          var kv = args[key2].split("@");
          if(kv.length==2)
            global_menu_data[key][kv[0]]=kv[1];
        }
      }else{
        if(args[0]!="")
          global_menu_data[key]=args[0];
      }
    }
    if(typeof global_menu_data["type"]==='undefined'){
      global_menu_data["type"]="all";
    }
 
    setAll();
    ustaw();
  };

  osm.addTo(map);
  
  var hash = new L.Hash(map,'index.php');
/*          MENU DATA CHANGED     */
  global_menu_data_changed=function(){
    map.params_url=[];
    console.log(global_menu_data);
    for(var key in global_menu_data){
      if(typeof global_menu_data[key]==="object"){
        //array
        if(Object.size(global_menu_data[key])==0)continue;
        var value="";
        for(var key2 in global_menu_data[key]){
          if(global_menu_data[key][key2]!=0){
            value+=key2+"@"+global_menu_data[key][key2]+";";
          }
        }
        if(value.length>0)
          map.params_url[key]=value;
        else if(typeof global_menu_data[key] !="string" || map.params_url[key].length == 0)
          delete map.params_url[key];
      }else if(typeof global_menu_data[key]==="string"){
        map.params_url[key]=global_menu_data[key];
      }
    }
    if(typeof global_menu_data["type"]==='undefined'){
      global_menu_data["type"]="all";
    }
    ustaw();
    hash.onMapMove();
  };
  var markers = new L.MarkerClusterGroup({ disableClusteringAtZoom: 14 });
  map.addLayer(markers);

  easyOverpass = new EasyOverpass({
    map:map,
    layer:markers,
    minzoom:10,
    minfullzoom:15,
    poiInfo: function(e,opening){
      var name="";
      if(e.tags.hasOwnProperty("name"))
        name=e.tags["name"];
      var tabs='<ul class="nav nav-tabs" id="poiTab"><li class="active"><a href="#basic" data-toggle="tab">'+lang_basic+'</a></li>';
      if(typeof opening != 'undefined' && e.tags.hasOwnProperty("opening_hours"))
        tabs+='<li><a href="#hours" data-toggle="tab">'+lang_opening_hours+'</a></li>';
      tabs+='<li><a href="#comments" data-toggle="tab">Comments</a></li>';
      tabs+='<li><a href="#tags" data-toggle="tab">Tags</a></li></ul>';

      var content = '<div class="tab-content">';
      //------basic
      content+='<div class="tab-pane active container" id="basic" style="margin:0px;width:400px">';
      
      //name
      content+='<h4><a href=\'http://osm24.eu/index.php?id='+e.id+'#!18/'+e.lat+'/'+e.lon+'/type='+global_menu_data["type"]+'/\'>' +((e.tags.hasOwnProperty("name")) ?  e.tags["name"]:"----")+'</a><div id="plusone-div" data-size="small" data-href=\'http://osm24.eu/index.php?id='+e.id+'#!18/'+e.lat+'/'+e.lon+'/type='+global_menu_data["type"]+'/\'></div></h4>';
      //addr
      content+='<small>'+((e.tags.hasOwnProperty("addr:city")) ?  e.tags["addr:city"]+', ' : "")+((e.tags.hasOwnProperty("addr:street")) ?  e.tags["addr:street"]+', ' : "")+((e.tags.hasOwnProperty("addr:housenumber")) ?  e.tags["addr:housenumber"]+', ' : "")+'</small>';
      //net
      content+='<p>'+((e.tags.hasOwnProperty("contact:email"))?'<i class="glyphicon glyphicon-envelope"></i>'+e.tags["contact:email"]+'<br />':"")+((e.tags.hasOwnProperty("contact:phone"))?'<i class="glyphicon glyphicon-phone-alt"></i>'+e.tags["contact:phone"]+'<br />':"")+
((e.tags.hasOwnProperty("contact:website"))?'<i class="glyphicon glyphicon-globe"></i><a href="'+e.tags["contact:website"]+'">'+e.tags["contact:website"]+'</a><br />':"");
      //Alternative contact
      content+=((e.tags.hasOwnProperty("email"))?'<i class="glyphicon glyphicon-envelope"></i>'+e.tags["email"]+'<br />':"")+    ((e.tags.hasOwnProperty("phone"))?'<i class="glyphicon glyphicon-phone-alt"></i>'+e.tags["phone"]+'<br />':"")+((e.tags.hasOwnProperty("website"))?'<i class="glyphicon glyphicon-globe"></i><a href="'+e.tags["website"]+'">'+e.tags["website"]+'</a><br />':"");

      content+=((e.tags.hasOwnProperty("cuisine"))?'<i class="glyphicon glyphicon-cutlery"></i>'+e.tags["cuisine"]+'<br />':"")+'</p>';
      //sports
      content+=((e.tags.hasOwnProperty("sport"))?'Sports: </i>'+e.tags["sport"]+'<br />':"");
      content+='<br/><br/><a onclick="showNoteMessage(\''+lang_report+'\',note_body,function n(){add('+e.lon+','+e.lat+",'"+name+"'"+');},'+e.lon+','+e.lat+')">'+lang_add_missing_data+'</a></div>'      
      //hours
      if(typeof opening != 'undefined' && e.tags.hasOwnProperty("opening_hours")){
        content+='<div class="tab-pane" id="hours">';
        if(e.tags['opening_hours']=="24/7")
            content+="24h<br/>";
        else
            content+=drawTable(opening, new Date());
        content+='<a href="https://github.com/AMDmi3/opening_hours.js/commits/master/demo.html">Author</a></div>';
      }

      //comments
      content+='<div class="tab-pane" id="comments"><div id="disqus_thread"></div></div>';

      //tags
      content+='<div class="tab-pane" id="tags"><table>';
      content+="<tr><th><b>"+lang_key+"</b></th><th><b>"+lang_value+"</b></th></tr>";
      for (key in e.tags)
        content+='<tr><td>'+key+'</td><td><i>'+e.tags[key]+'</i></td></tr>';
      content+='</table></div>';


      content+='</div>';
      //link
      var link = '';
      var container = $('<div />');
      container.html('<div class="tabbable tabs-below">'+content+tabs+'</div>'+link);
      return [container[0], 'http://osm24.eu/index.php?id='+e.id+'#!18/'+e.lat+'/'+e.lon+'/type='+global_menu_data["type"]+'/' ];
    },
  });

  map.params_url_updated();

  map.on('locationfound', onLocationFound);
  map.on('locationerror', onLocationError);

  map.on('popupopen', function() {
    var href=$("#plusone-div").data("href");
    var size=$("#plusone-div").data("size");
    gapi.plusone.render("plusone-div",{'size':size,'href':href});
  });
  n=true;
  var href=$("#main-plus").data("href");
  var size=$("#main-plus").data("size");
  gapi.plusone.render("main-plus",{'size':size,'href':href});

  if(typeof get_locate != 'undefined')
    map.locate({setView:true,maxZoom: 16, enableHighAccuracy: true, maximumAge: 30000, timeout: 3000000,});
});


function locate_toggle(){
  console.log(locate);
  if(locate==0||locate==3){
    locate=0;
    map.locate({setView:true,maxZoom: 16, enableHighAccuracy: true, maximumAge: 30000, timeout: 3000000,});
  }else{
    $("#locate-button").text(lang_locate);
    map.stopLocate();
    locate=3;
    if(typeof location_marker != 'undefined'){
      map.removeLayer(location_marker);
      delete location_marker;
    }
    if(typeof location_circle != 'undefined'){
      map.removeLayer(location_circle);
      delete location_circle;
    }
    
  }
}