L.Control.NominatimGeocoder = L.Control.extend({
	options: {
		collapsed: true,
		position: 'topright',
		text: 'Locate',
		callback: function (results) {
			// Check if no results are returned
			if (results.length >= 1) {
				// Just take the first place
				var bbox = results[0].boundingbox,
					southWest = new L.LatLng(bbox[0], bbox[2]),
					northEast = new L.LatLng(bbox[1], bbox[3]),
					bounds = new L.LatLngBounds(southWest, northEast);
				// Center on it
				this._map.fitBounds(bounds);
			}
			// TODO Indicate lack of results to user
		}
	},

	_callbackId: 0,

	initialize: function (options) {
		L.Util.setOptions(this, options);
	},

	onAdd: function (map) {
		this._map = map;
		var className = 'leaflet-control-geocoder',
			container = this._container = L.DomUtil.create('div', className);

		L.DomEvent.disableClickPropagation(container);

		var form = this._form = L.DomUtil.create('form', className + '-form');

		var input = this._input = document.createElement('input');
		input.type = "text";

		var submit = document.createElement('button');
		submit.type = "submit";
		submit.innerHTML = this.options.text;

		form.appendChild(input);
		form.appendChild(submit);

		L.DomEvent.addListener(form, 'submit', this._geocode, this);

		if (this.options.collapsed) {
			L.DomEvent.addListener(container, 'mouseover', this._expand, this);
			L.DomEvent.addListener(container, 'mouseout', this._collapse, this);

			var link = this._layersLink = L.DomUtil.create('a', className + '-toggle', container);
			link.innerHTML ='<span class="glyphicon glyphicon-search"></span>';
			link.href = '#';
			link.title = 'Nominatim Geocoder';

			L.DomEvent.addListener(link, L.Browser.touch ? 'click' : 'focus', this._expand, this);

			this._map.on('movestart', this._collapse, this);
		} else {
			this._expand();
		}

		container.appendChild(form);

		return container;
	},

	_geocode : function (event) {
		L.DomEvent.preventDefault(event);
		this._callbackId = "_l_nominatimgeocoder_" + (this._callbackId++);
		window[this._callbackId] = L.Util.bind(this.options.callback, this);

		var params = {
			q: this._input.value,
			format: "json",
			// We only use the first result currently
			limit: 1,
			json_callback : this._callbackId
		},
		url =  "http://open.mapquestapi.com/nominatim/v1/search" + L.Util.getParamString(params),
		script = document.createElement("script");

		script.type = "text/javascript";
		script.src = url;
		script.id = this._callbackId;
		document.getElementsByTagName("head")[0].appendChild(script);
	},

	_expand: function () {
		L.DomUtil.addClass(this._container, 'leaflet-control-geocoder-expanded');
	},

	_collapse: function () {
		this._container.className = this._container.className.replace(' leaflet-control-geocoder-expanded', '');
	}
});
