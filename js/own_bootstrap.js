/*
Author: Adam Jordanek (dotevo)
License: GPLv2
*/

var global_menu_data={};
var global_menu_data_changed=function(){};

function one_change_click(me,change){
  var selText = me.text();
  var parent=me.closest('.btn-group-own').find('.dropdown-toggle');
  parent.html(selText+' <span class="caret"></span>');
  //hide
  $("div [class*=\"visible-\"]").css( "display", 'none' );
  //show
  $( ".visible-"+me.attr("id")).css( "display", 'inline' );
  if(change==1){
    global_menu_data[parent.attr("id")]=me.attr("id");
    global_menu_data_changed();
  }
}

$(".select-one-change li a").click(function(){
  one_change_click($(this),1);
});

function one_click(me,change){
  var selText = me.text();
  var parent=me.closest('.btn-group-own').find('.dropdown-toggle');

  if(typeof parent.attr('data-arrow')=== "undefined")
    parent.html(selText);
  else
    parent.html(selText+' <span class="caret"></span>');
  //save
  if(change==1){
    global_menu_data[parent.attr("id")]=me.attr("id");
    global_menu_data_changed();
  }
}

$(".select-one li a").click(function(){
  one_click($(this),1);
});


function multi_getState(parent,me){
  //load actual state
  var state;
  if(typeof global_menu_data[parent.attr("id")] === 'undefined'){
    global_menu_data[parent.attr("id")]={};
  }
  if(typeof global_menu_data[parent.attr("id")][me.attr("id")] === 'undefined'){
    state=0;
  }else{
    state=global_menu_data[parent.attr("id")][me.attr("id")];
  }
  return state;
}

function multi_state_set(me,state){
  me.children("[class*=\"state\"]").css("display", 'none');
  me.children(".state"+state).css("display", "inline");
}

function multi_state_click(me, increment){
  var parent=me.closest('.btn-group-own').find('.dropdown-toggle');
  var state=multi_getState(parent,me);
  //increment state
  if(increment==1){
    state++;
    if(me.children(".state"+state).length == 0){
      state=0;
    }
  }
  //set classes
  multi_state_set(me,state);
  global_menu_data[parent.attr("id")][me.attr("id")]=state;
  if(increment==1)
    global_menu_data_changed();
}

$(".select-multi-state a").click(function(){
  multi_state_click($(this), 1);
});


function text_enter(me,change){
  var parent=me.closest('.btn-group-own').find('.dropdown-toggle');
  var state=multi_getState(parent,me);
  if(change==1){
    var nnn=me.val();
    global_menu_data[parent.attr("id")][me.attr("id")]=nnn;
    global_menu_data_changed();
  }
  if(state==0 && change == 0)
    me.val("");
  else if(change == 0)
    me.val(global_menu_data[parent.attr("id")][me.attr("id")]);
}


$(".select-text").keypress(function( event ) {
  if ( event.which == 13 ){
    text_enter($(this),1);
  }
});


$('.dropdown-always-on li').click(function(e) {
        e.stopPropagation();
});

function setDefault(parent){
  if(typeof parent.data("default-id")!='undefined' && typeof global_menu_data[parent.attr("id")] === 'undefined')
    global_menu_data[parent.attr("id")]=parent.data("default-id");
}

function setAll(){
  $(".select-one-change").each(function (){
    var parent=$(this).closest('.btn-group-own').find('.dropdown-toggle');
    setDefault(parent);
    if(typeof global_menu_data[parent.attr("id")] != "undefined"){
      var child=$(this).find("#"+global_menu_data[parent.attr("id")]);
      one_change_click(child,0);
    }
  });

  $(".select-one").each(function (){
    var parent=$(this).closest('.btn-group-own').find('.dropdown-toggle');
    setDefault(parent);
    if(typeof global_menu_data[parent.attr("id")] != "undefined"){
      var child=$(this).find("#"+global_menu_data[parent.attr("id")]);
      one_click(child,0);
    }
  });

  //state
  $(".select-multi-state a").each(function (){
    multi_state_click($(this), 0);
  });

  $(".select-text").each(function (){
    text_enter($(this),0)
  });
}


