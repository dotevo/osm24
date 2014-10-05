/* GLOBAL */
var i=true;
var map;
var scrollmenu;

$("#bottomheader").on("click", function () {
	if(i)
		$( "#content" ).fadeTo( 400, 0.5 );
	else
		$( "#content" ).fadeTo( 400, 1 );
	i=!i;
	$("#bottomcontent").slideToggle(200);
	scrollmenu.update();
});

$(document).on('pagebeforeshow', '#page', function(){
	$( "#left-panel" ).panel( "open");
});

$( document ).ready(function() {
	map = L.map('map').setView([51.505, -0.09], 13);
	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
		maxZoom: 18
	}).addTo(map);
	$(window).load(function() {
		map.invalidateSize();
	});
	/* SCROLL MENU */
	scrollmenu = $('#scroll-menu').scrolllist({open: function(id){console.log("TEST"+id);}});
	$( "#left-panel" ).panel({
			open: function(){scrollmenu.update();},
			close: function(){scrollmenu.update();}
			});
	$(window).resize(function(){scrollmenu.update();});
	

});