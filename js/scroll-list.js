jQuery.fn.scrolllist = function (opt) {
	this.options = opt;
	var _this=this;
	var el = $( this ).children( ".scroll-menu-list" );
	var box = $( this ).children( ".scroll-menu-box" );

	var Xmouse;
	var down=false;
	var acc;
	var relX;
	var timeStamp = 0;
	var moved = false;

	var box_pos;
	var last_selected = 0;

	var changePosition = function ( my ){
		var di = box_pos - my.position().left;
		//Move item
		el.css('left', di + 'px');
		last_selected = my;
#ifdef DEBUG
		console.log("Selected: "+my.attr("id"));
#endif
	};

	this.update = function() {
		box_pos = box.position().left;
		if( last_selected == 0){
			last_selected = el.children('li').first();
		}
		changePosition(last_selected);
	};

	el.children( 'li' ).on( "click", function() {
		if(moved)
			return;
		if( $( this ).attr("id") == last_selected.attr("id")){
#ifdef DEBUG
			console.log("Open");
#endif
			if(_this.options.hasOwnProperty("open"))
				_this.options.open( $(this) );
		}else{
#ifdef DEBUG
			console.log("Clicked");
#endif
			changePosition( $( this ) );
		}
	});

	this.setItem = function(id){
		changePosition(el.children('#'+id).first());
	};

	var startX;

	/*---EVENT--------------------MOVE-------------------------*/
	var eventMove = function ( e ) {
		moved = true;
		acc = 100 * ( e.pageX - Xmouse ) / ( e.timeStamp - timeStamp ) + acc / 2;
		Xmouse = e.pageX;
		timeStamp = e.timeStamp;
		var diffX = startX + e.pageX - relX;
#ifdef DEBUG
		console.log("Mouse move: X "+e.pageX+" LEFT "+diffX);
#endif
		el.css('left', diffX + 'px');
	};
	/*---EVENT--------------------DOWN-------------------------*/
	var eventDown = function ( e ) {
		down=true;
		moved = false;
		Xmouse = e.pageX;
		acc = 0;
		timeStamp = e.timeStamp;
		relX = e.pageX;
		startX = el.position().left;
#ifdef DEBUG
		console.log("Mouse down: X "+relX);
#endif
		$(document).bind('mousemove', function( e ){ eventMove(e); });
		$(document).bind('touchmove', function( e ){ eventMove(e.touches[0]); });
	};

	this.bind('mousedown', function( e ){ eventDown(e); });
	this.bind('touchstart', function( e ){ eventMove(e.touches[0]); });
	/*---EVENT--------------------UP---------------------------*/
	var eventUp = function ( e ) {
		//If not clicked
		if(!down) return;
		down=false;
		var diffX = startX + e.pageX - relX + acc;
#ifdef DEBUG
		console.log("Mouse up: X "+e.pageX+" LEFT "+diffX+" ACC "+acc);
#endif
		//Find nearest item to dest.
		var nearest = 0;
		el.children( 'li' ).each( function( i, j ){
			var left = $( this ).position().left;
			if(nearest == 0 ||
					Math.abs( box_pos - left-diffX ) < Math.abs( box_pos - nearest.position().left-diffX ) )
				nearest=$( this );
		});
		el.children('li').css('background','#FFF');

		if( nearest != 0 ){
			changePosition( nearest );
		}else{
			el.css('left', diffX + 'px');
		}

		
		$(document).unbind('mousemove');
		$(document).unbind('touchmove');
	};
	
	$(window).bind( 'mouseup', function ( e ){ eventUp(e); });
	$(window).bind( 'touchend', function ( e ){ eventUp(e.touches[0]); });
	return this;
};

