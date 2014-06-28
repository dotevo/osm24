function Query(options){
  this.options = options;
}

Query.prototype.getTagArray = function(tag,typetag,excludetag){
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

Query.prototype.getTagFromElement = function(el,state){
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
  if(typeof fulltag!='undefined') return this.getTagArray(fulltag,typetag,excludetag);
  //If multistate get tag-pair-state value
  if(state!=-1){
    fulltag=el.data("tag-pair-s"+state);
    if(typeof fulltag!='undefined') return this.getTagArray(fulltag,typetag,excludetag);
  }
  //INIT
  var valuetag=el.data("tag-value");
  var keytag=el.data("tag-key");
  if(typeof keytag==='undefined'&&el.closest(".tag-parent").length>0)
    keytag=el.closest(".tag-parent").data("tag-key");
  var chartag=el.data("tag-char");
  if(typeof chartag==='undefined')
    chartag=el.closest(".tag-parent").data("tag-char");
  if(typeof chartag==='undefined') chartag="=";

  //if tag-key does not exists
  if(typeof keytag==='undefined')  return "";
  //if tag-value is defined
  if(typeof valuetag!='undefined'){
    if(valuetag=="@")//if value is from input
      return this.getTagArray("['"+keytag+"'"+chartag+"'"+el.val()+"']",typetag,excludetag);
    //other case
    return this.getTagArray("['"+keytag+"'"+chartag+"'"+valuetag+"']",typetag,excludetag);
  }
  //use ID becouse tag-value not found
  return this.getTagArray("['"+keytag+"'"+chartag+"'"+el.attr("id")+"']",typetag,excludetag);
}

//FIXME
Query.prototype.tagsjoin = function(tags,newt){
  if(newt==="")return tags;
  if(tags==="")tags=[];
  for(var key in newt){
    tags.push(newt[key]);
  }
  return tags;
}

Query.prototype.getTags = function(from,parent){
  var tags=[];
  for(var key in from){
    if(typeof global_menu_data[key] === 'object'){
      tags=this.tagsjoin(tags,this.getTags(from[key],key));
    }else{
      if(typeof from[key]==='string' && from[key]!=""){
        //Values
        var p=$('.global-menu-data #'+from[key]);
        if(p.length>0){
          tags=this.tagsjoin(tags,this.getTagFromElement(p,-1));
        }else{
          p=$('.global-menu-data #'+key);
          if(p.length>0){
            tags=this.tagsjoin(tags,this.getTagFromElement(p,from[key]));
          }
        }
      }else if(typeof from[key]==='number'){
        var p=$('.global-menu-data #'+key);
        if(p.length>0){
          tags=this.tagsjoin(tags,this.getTagFromElement(p,from[key]));
        }
      }
    }
  }
  return tags;
}

Query.prototype.getQuery = function(data){
  var tags=this.getTags(data,"");
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
  return this.options.url+query;
}
