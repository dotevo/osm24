/*
 * Author: Adam Jordanek (dotevo)
 */

L.Control.Timeslider = L.Control.extend({	options : {
		position : 'topright'
	},
	initialize : function(options) {
		this.callback_dataChanged=null;
		this.div=null;
		this.hidden=true;		
		var _this=this;
		this.timerId = setInterval(function(){_this.timer(_this)}, 300000); 
		var d=new Date();
		this.currenttime=true;
		this._setDateFromObj(d);
		
		this.callback_dataChanged = options.callback;
	},

	onAdd : function(map) {
	    this.div = L.DomUtil.create('div', 'll-button timeslider');	    
	    this.div.appendChild(this._build_button());
	    L.DomEvent.on(this.div, 'mousedown', L.DomEvent.stopPropagation)
	    .on(this.div, 'dblclick', L.DomEvent.stopPropagation)
	    .on(this.div, 'touchstart', L.DomEvent.stopPropagation)
	    .on(this.div, 'click', L.DomEvent.stopPropagation);
	    L.DomEvent.disableClickPropagation(this.div);
	    
	    return this.div;
	},
	
	_setDateFromObj: function(d){
		var curr_date = d.getDate();
	    var curr_month = d.getMonth() + 1;
	    var curr_year = d.getFullYear();	     
		this._setDate(curr_date+"/"+curr_month+"/"+curr_year);
		this._setTime(d.getHours(),d.getMinutes());
	},

	onRemove : function(map) {
	},
	
	_dateChanged: function(){
		if(this.callback_dataChanged != null){
			var d=this.date.split("/");
			var h=Math.floor(this.time);
			var m=(this.time-h==0)*60;
			var dat=new Date();
			dat.setYear(d[2]);dat.setMonth(d[1]-1);dat.setDate(d[0]);			
			dat.setHours(h);dat.setMinutes(m);
			this.callback_dataChanged(dat);
		}
	},
	
	_setTimeV: function(value){
		if(this.time!=value){
			this.time=value;
			this._dateChanged();
			var hours=Math.floor(this.time);
			$('#time-text').text(hours+":"+Math.floor((value-hours)*60));
		}
	},
	
	_setTime: function(hours,minutes){
		var time = hours + (minutes/60);
		this._setTimeV(time);
	},
	
	_setDate : function(date){
		if(this.date!=date){
			this.date=date;
			this._dateChanged();
		}
	},
	
	_updateLabels: function(){
		var hour=Math.floor(this.time);
		$('#time-text').text(hour+":"+Math.floor((this.time-hour)*60));
		//Times
		$('#times').attr('data-slider-value',this.time);
		//Date
		$("#dp").datepicker("setDate", this.date);		
	},
	
	timer: function(t){
		console.log(this.currenttime);
		if(t.currenttime==true){
			var d= new Date();			
			t._setDateFromObj(d);
			t._updateLabels();
		}
	},
	
	_clicked : function(e){
		if(this.hidden){
			var _this = this;
			
			L.DomUtil.removeClass(this.div,'ll-button');
			L.DomUtil.addClass(this.div,'ll-box');
			var hour=Math.floor(this.time);
			this.div.innerHTML = "<i id='time-text'>"+hour+":"+Math.floor(((this.time-hour)*60))+"</i>";
			this.div.appendChild(this._build_button());
			var dd = L.DomUtil.create('div');
			dd.innerHTML += '<input type="checkbox" id="timecb"'+(_this.currenttime?'':'checked')+'/>Use different time';
			dd.innerHTML +='<br/><input id="times" data-slider-id="timeslider" type="text" data-slider-min="0" data-slider-max="23.5" data-slider-step="0.5" data-slider-value="'+this.time+'"/><br/>'+
			  '<div class="input-group date" id="dp"><input type="text" class="form-control" id="txt-dp"><span class="input-group-addon"><i class="glyphicon glyphicon-th"></i></span></div>';
			
			this.div.appendChild(dd);
			$('#times').slider({precision: 2});
			$("#times").on('slideStop', function(slideEvt) {
				_this._setTimeV(slideEvt.value);
			});
			
			$('#dp').datepicker({
				format: 'dd/mm/yyyy',
				calendarWeeks: true,
				autoclose: true,
				todayHighlight: true
			});
			
			$("#dp").datepicker("setDate", this.date);
			$('#txt-dp').change(function () {
				_this._setDate(($('#txt-dp').val()));
			});
			
			$('#timecb').change(function () {				
				if(this.checked){
					$('#times').slider("enable");
					$("#txt-dp").removeAttr('disabled');
					_this.currenttime=false;
				}else{
					$('#times').slider("disable");
					$("#txt-dp").attr('disabled');
					_this.currenttime=true;
					_this._setDateFromObj(new Date());
				}
			});
			$('#timecb').trigger('change');
		}
		else{
			L.DomUtil.removeClass(this.div,'ll-box');
			L.DomUtil.addClass(this.div,'ll-button');
			this.div.innerHTML = "";
		    this.div.appendChild(this._build_button());
		}
		this.hidden=!this.hidden;		
	},
	
	_build_button: function(){
		var button = L.DomUtil.create('i', 'glyphicon glyphicon-time ll-bt-txt');
		L.DomEvent.addListener(button, 'click', L.DomEvent.stopPropagation).
		  addListener(button, 'click', this._clicked,this);
		
		return button;
	}

});