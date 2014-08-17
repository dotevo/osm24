/*Responsible for:
 *-Download data from overpass
 *-Add data to layer
 */

//BBox to string converter
L.LatLngBounds.prototype.toOverpassBBoxString = function (){
  var a = this._southWest,
      b = this._northEast;
  return [a.lat, a.lng, b.lat, b.lng].join(",");
};

//Constructor
function EasyOverpass(options){
  this.options = options;
  this.jobs = 0;
  this._ids = {};
  this.options.map.on('moveend', this.onMoveEnd, this);
}

//Ways -> Elements
EasyOverpass.prototype.dataDownloadWays = function(data){
  //If query has changed
  if(this.query != this.instance.options.queryWays){return;}
  //Get nodes
  var nodes = {};
  for(var i=0;i<data.elements.length;i++) {
    if(data.elements[i].type === "node")
      nodes[data.elements[i].id] = data.elements[i];
  }
  for(var i=0;i<data.elements.length;i++){
    if(data.elements[i].type === "way"){
      var lon = 0;
      var lat = 0;
      var j = 0;
      //Avr loc
      for(var node in data.elements[i].nodes){
        var n = data.elements[i].nodes[node];
        lon += nodes[n].lon;
        lat += nodes[n].lat;
        j++;
      }
      lon /= j;
      lat /= j;

      el={id:"w"+data.elements[i].id,
          tags:data.elements[i].tags, lon:lon, lat:lat};
      this.instance.addElement(el);
    }
  }
};

//Nodes to elements
EasyOverpass.prototype.dataDownloadNodes = function(data){
  if(this.query != this.instance.options.query && this.query != "perm"){return;}

  for(i=0;i<data.elements.length;i++){
     this.instance.addElement(data.elements[i]);
  }
};


EasyOverpass.prototype.addElement = function(el){
  if (el.id in this._ids){return;}
  this._ids[el.id] = true;

  //Get marker
  var marker = this.options.newElement(el);

  this.options.layer.addLayer(marker);
  if(typeof this.options.autoclick != 'undefined' &&
      el.id == this.options.autoclick){
    map.panTo(marker.getLatLng());
    marker.fire('click');
    this.options.autoclick = 0;
  }
};

EasyOverpass.prototype.download = function(url, context, success){
  if(typeof this.options.onDownload != 'undefined' && this.jobs == 0){
    this.options.onDownload();
  }

  this.jobs = this.jobs+1;
  var self = this;
  $.ajax({
    url: url,
    context: context,
    crossDomain: true,
    dataType: "json",
    data: {},
    success: success
  }).always(function(){
       self.jobs = self.jobs-1;
       if(typeof self.options.onDownloadFinished != 'undefined' && self.jobs == 0){
         self.options.onDownloadFinished();
       }
     });
};

EasyOverpass.prototype.onMoveEnd = function(){
  if (typeof this.options.layer === 'undefined') {
    console.error("_map == null");
    return;
  }

  var out = "out 40;";
  if(this.options.minfullzoom <= this.options.map.getZoom()){
    out = "out;"
  }
  if(this.options.minzoom > this.options.map.getZoom()){ 
    return;
  }

  if(this.options.query != ""){
    var query_a = this.options.query+out;
    console.log("Query: "+query_a);
    query_a = query_a.replace(/(BBOX)/g, this.options.map.getBounds().toOverpassBBoxString());
    this.download(query_a, { instance: this, query: this.options.query }, this.dataDownloadNodes);
  }

  if(this.options.minfullzoom <= this.options.map.getZoom()){
    if(this.options.queryWays!=""){
      var query_a=this.options.queryWays+out+'(._;>;);out;';
      console.log("Query: "+query_a);
      query_a = query_a.replace(/(BBOX)/g, this.options.map.getBounds().toOverpassBBoxString());
      this.download(query_a, { instance: this, query: this.options.queryWays }, this.dataDownloadWays);
    }
  }
};

EasyOverpass.prototype.downloadID = function(id){
  if(typeof id != 'undefined'){
    var out = url+"data=[out:json];";
    //if node
    if(id[0] != 'w'){
      out += "node("+id+");out;";
      this.download(out, { instance: this, query: "perm"}, this.dataDownloadNodes);
    }
    //if way
    else{
       var a = id.substring(1);
       out += "way("+a+");out;(._;>;);out;";
       this.download(out, { instance: this, query: "perm"}, this.dataDownloadWays);
    }
  }
};

EasyOverpass.prototype.clear = function(){
  this.options.layer.clearLayers();
  this._ids={};
};
