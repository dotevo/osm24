var url="http://overpass-api.de/api/interpreter?";
//var url="http://overpass.osm.rambler.ru/cgi/interpreter?";
var n=false;
var datan=new Date();
(function(i){var e=/iPhone/i,n=/iPod/i,o=/iPad/i,t=/(?=.*\bAndroid\b)(?=.*\bMobile\b)/i,r=/Android/i,d=/BlackBerry/i,s=/Opera Mini/i,a=/IEMobile/i,b=/(?=.*\bFirefox\b)(?=.*\bMobile\b)/i,h=RegExp("(?:Nexus 7|BNTV250|Kindle Fire|Silk|GT-P1000)","i"),c=function(i,e){return i.test(e)},l=function(i){var l=i||navigator.userAgent;this.apple={phone:c(e,l),ipod:c(n,l),tablet:c(o,l),device:c(e,l)||c(n,l)||c(o,l)},this.android={phone:c(t,l),tablet:!c(t,l)&&c(r,l),device:c(t,l)||c(r,l)},this.other={blackberry:c(d,l),opera:c(s,l),windows:c(a,l),firefox:c(b,l),device:c(d,l)||c(s,l)||c(a,l)||c(b,l)},this.seven_inch=c(h,l),this.any=this.apple.device||this.android.device||this.other.device||this.seven_inch},v=i.isMobile=new l;v.Class=l})(window);


function addElement(e){
  var pos = new L.LatLng(e.lat, e.lon);
  var poi = new POI(e);
  poi.updateShadow(datan);

  var VAL = poi.getInfoBox();
  var popup = VAL[0];
  var m_icon = poi.getIcon();
  var marker;
  if(isMobile.any){
    marker=new L.marker(pos, {icon: m_icon,riseOnHover: true}).
                        bindLabel(poi.getName());
    marker.el = poi;
    marker.on("click",function(){
              this.label.close();
              ga('send', 'pageview', {
                 'page': VAL[1],
                 'title': 'PopupMob'
                 });

              showMessage(name,popup.outerHTML,0);
              DISQUS.reset({
                 reload: true,
                 config: function () {  
                    this.page.identifier = e.id+"";  
                    this.page.url = VAL[1];
                 }
              });
    },marker);


  }else{
    marker=new L.marker(pos, {icon: m_icon,riseOnHover: true}).
                        bindLabel(poi.getName()).bindPopup(popup, {minWidth: 300});
    marker.el = poi;
    marker.on("click",function(){
              this.label.close();
              ga('send', 'pageview', {
                 'page': VAL[1],
                 'title': 'Popup'
                 });
              DISQUS.reset({
                 reload: true,
                 config: function () {  
                    this.page.identifier = e.id+"";  
                    this.page.url = VAL[1];
                 }
              });
           },marker);
  }
  return marker;
}

Date.prototype.addHours= function(h){
    this.setHours(this.getHours()+h);
    return this;
}

var $msg2Modal = $('#dynModal').modal({
      backdrop: false,
      show: false,
      keyboard: false
    });

function showMessage(header, body, callback) {
  if(callback===0){
    $msg2Modal
      .find('.modal-header > h3').text(header).end()
      .find('.modal-body').html($.parseHTML( body )).end()
      .find('.callback-btn').off('click.callback')
        .hide().end()
      .modal('show');
   }else{
    $msg2Modal
      .find('.modal-header > h3').text(header).end()
      .find('.modal-body').html($.parseHTML( body )).end()
      .find('.callback-btn').show().off('click.callback')
        .on('click.callback', callback).end()
      .modal('show');
   }
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
  var queryC=new Query({url:url});
  var a=queryC.getQuery(global_menu_data);
  easyOverpass.options.query=a.replace(/(DATATYPE)/g, 'node');
  easyOverpass.options.queryWays=a.replace(/(DATATYPE)/g, 'way');
  easyOverpass.clear();
  if(typeof permalink_object_id != 'undefined' && nn==0){
    easyOverpass.downloadID(permalink_object_id);nn=1;
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
var markers = new L.MarkerClusterGroup({ disableClusteringAtZoom: 14 });

function reloadList(){
  $('#poilist').html('');
  var a={};
  markers.eachLayer(function (layer) {
    if(map.getBounds().contains(layer.getLatLng())){
    a[layer.el.getName()]=$('<li class="list-group-item">'+
              '<div class="">'+
              '<span class="name">'+layer.el.getIconDiv()+layer.el.getName()+'</span>'+
              '</div>'+
              '</li>');}});

  var sorted_keys = Object.keys(a).sort();
  for(var i=0;i<sorted_keys.length;++i){
    $('#poilist').append(a[sorted_keys[i]]);
  }
}

function getCSV(){
  var str="";
  markers.eachLayer(function (layer) {
    if(map.getBounds().contains(layer.getLatLng())){
       str+=layer.el.getName()+"\t";
       if(layer.el.element.tags.hasOwnProperty("opening_hours"))
         str+=layer.el.element.tags["opening_hours"];
       str+="\t";
       str+="\n";
    }});
  return encodeURI(str);
}

function dateChanged(d){
	datan=d;
	markers.eachLayer(function (layer) {
		var a=layer.el.updateShadow(d);
		if(a)
			layer.setIcon(layer.el.getIcon());
	});
}


$(window).load(function() {
$("#export_csv").click(function(){
  console.log("A");
  document.location = 'data:Application/csv;charset=utf-8,' +
                         getCSV();
});


  map = new L.Map('map',{
    zoomControl: false,
    contextmenu: true,
    contextmenuWidth: 140,
    contextmenuItems: [{
      text: 'Report data',
      callback: report_poi
    }]
  }).setView([51.505, 21], 7);

  var legend = L.control({position: 'bottomright'});
  legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend');

    div.innerHTML +='<i class="map-icon-open" style="background-size: 18px 18px;"></i> Open <br/>'+
    '<i class="map-icon-last" style="background-size: 18px 18px;"></i> Last hour <br/>'+
    '<i class="map-icon-closed" style="background-size: 18px 18px;"></i> Close <br/>'+
    '<i class="map-icon-nd" style="background-size: 18px 18px;"></i> No data <br/>';
    return div;
  };
  legend.addTo(map);
  
  var timeslider = new L.Control.Timeslider({position: 'topright',
	  callback: dateChanged
  });
  timeslider.addTo(map);

  var statusA = L.control({position: 'topleft'});
  statusA.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info status');
    div.innerHTML +='<i id="info"></i>';
    return div;
  };
  statusA.addTo(map);

  map.on("zoomend", function (e) {
   if(10>map.getZoom()){
     $("#info").html("Please, zoom in.");
  }else{
    if($("#info").html()=="Please, zoom in.")
      $("#info").html("");
  }
  });
var zoomControl = L.control.zoom({
                    position: 'bottomleft'
                });
                map.addControl(zoomControl);


  if(global_menu_data['type']==="undefined")
     global_menu_data['type']='all';
  var modal = $('#myModal')
  //modal.modal('show'); 
  $('#mapper').removeAttr("checked");

  var attrib = 'ODbL OpenStreetMap, Data: <a href="http://www.overpass-api.de/">OverpassAPI</a>';
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

  map.addLayer(markers);

  var idd=0;
  if(typeof permalink_object_id != 'undefined'){
    idd=permalink_object_id;
  }

  easyOverpass = new EasyOverpass({
    map:map,
    newElement: addElement,
    layer:markers,
    autoclick: idd,
    onDownload: function(){$("#info").html("Loading...");},
    onDownloadFinished: function(){$("#info").html("");reloadList();},
    minzoom:10,
    minfullzoom:15,
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

var snapper = new Snap({
  element: document.getElementById('content')
});

var addEvent = function addEvent(element, eventName, func) {
	if (element.addEventListener) {
    	return element.addEventListener(eventName, func, false);
    } else if (element.attachEvent) {
        return element.attachEvent("on" + eventName, func);
    }
};

var l_opened=false;

addEvent(document.getElementById('open-left'), 'click', function(){
    if(l_opened){
      snapper.close('left');
    }
    else
       snapper.open('left');
    l_opened=!l_opened;
});
