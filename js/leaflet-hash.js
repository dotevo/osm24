(function(window) {
	var HAS_HASHCHANGE = (function() {
		var doc_mode = window.documentMode;
		return ('onhashchange' in window) &&
			(doc_mode === undefined || doc_mode > 7);
	})();

	L.Hash = function(map,file) {
		this.onHashChange = L.Util.bind(this.onHashChange, this);

		if (map) {
			this.init(map,file);
		}
	};

	L.Hash.parseHash = function(hash) {
        ga('send', 'pageview', {
                  'page': hash,
                  'title': 'Permalink'
        });
		if(hash.indexOf('#') === 0) {
			hash = hash.substr(1);
		}
        if(hash.indexOf('!') === 0) {
			hash = hash.substr(1);
		}

		var args = hash.split("/");
		var zoom = parseInt(args[0], 10),
		lat = parseFloat(args[1]),
		lon = parseFloat(args[2]);
		if (isNaN(zoom) || isNaN(lat) || isNaN(lon)) {
			return {
                params_url: ""
			};
		} else {
            var params={};
            for (i = 3; i < args.length; i++) {
              var kv=args[i].split("=");
              if(kv.length == 2){
                params[kv[0]]=kv[1];
              }
            }

			return {
				center: new L.LatLng(lat, lon),
				zoom: zoom,
                params_url: params
			};
			}
	};

	L.Hash.formatHash = function(map) {
		var center = map.getCenter(),
		    zoom = map.getZoom(),
		    precision = Math.max(0, Math.ceil(Math.log(zoom) / Math.LN2));
        
		var ret="#!" + [zoom,
			center.lat.toFixed(precision),
			center.lng.toFixed(precision)
		].join("/");
        //Added by Dotevo
        if(typeof map.params_url != "undefined"){
          for(var key in map.params_url){
             ret+="/"+key+"="+map.params_url[key];
          }
        }
        //END

        return ret+"/";
	},

	L.Hash.prototype = {
		map: null,
		lastHash: null,
        file: null,
		parseHash: L.Hash.parseHash,
		formatHash: L.Hash.formatHash,

		init: function(map,file) {
			this.map = map;
            this.file = file;

			// reset the hash
			this.lastHash = null;
			this.onHashChange();

			if (!this.isListening) {
				this.startListening();
			}
		},

		removeFrom: function(map) {
			if (this.changeTimeout) {
				clearTimeout(this.changeTimeout);
			}

			if (this.isListening) {
				this.stopListening();
			}

			this.map = null;
		},

		onMapMove: function() {
			// bail if we're moving the map (updating from a hash),
			// or if the map is not yet loaded

			if (this.movingMap || !this.map._loaded) {
				return false;
			}

			var hash = this.formatHash(this.map);
			if (this.lastHash != hash) {
                if(typeof window.history.pushState == 'function') {
                  //HTML5
                  window.history.pushState({}, "Hide", this.file+hash);
                }else{
				  location.replace(hash);
                }
				this.lastHash = hash;
                ga('send', 'pageview', {
                  'page': hash,
                  'title': 'Moved'
                });
			}
		},

		movingMap: false,
		update: function() {
			var hash = location.hash;
			if (hash === this.lastHash) {
				return;
			}
			var parsed = this.parseHash(hash);
			if (parsed) {
				this.movingMap = true;
                if(typeof parsed.center != 'undefined' && typeof parsed.zoom!='undefined')
				  this.map.setView(parsed.center, parsed.zoom);
                this.map.params_url = parsed.params_url;
                if(typeof this.map.params_url_updated != "undefined"){
                  this.map.params_url_updated();
                } 

				this.movingMap = false;
			} else {
				this.onMapMove(this.map);
			}
		},

		// defer hash change updates every 100ms
		changeDefer: 100,
		changeTimeout: null,
		onHashChange: function() {
			// throttle calls to update() so that they only happen every
			// `changeDefer` ms
			if (!this.changeTimeout) {
				var that = this;
				this.changeTimeout = setTimeout(function() {
					that.update();
					that.changeTimeout = null;
				}, this.changeDefer);
			}
		},

		isListening: false,
		hashChangeInterval: null,
		startListening: function() {
			this.map.on("moveend", this.onMapMove, this);

			if (HAS_HASHCHANGE) {
				L.DomEvent.addListener(window, "hashchange", this.onHashChange);
			} else {
				clearInterval(this.hashChangeInterval);
				this.hashChangeInterval = setInterval(this.onHashChange, 50);
			}
			this.isListening = true;
		},

		stopListening: function() {
			this.map.off("moveend", this.onMapMove, this);

			if (HAS_HASHCHANGE) {
				L.DomEvent.removeListener(window, "hashchange", this.onHashChange);
			} else {
				clearInterval(this.hashChangeInterval);
			}
			this.isListening = false;
		}
	};
	L.hash = function(map) {
		return new L.Hash(map);
	};
	L.Map.prototype.addHash = function() {
		this._hash = L.hash(this);
	};
	L.Map.prototype.removeHash = function() {
		this._hash.removeFrom();
	};
})(window);
