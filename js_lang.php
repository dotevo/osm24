<?php
$lang='en_EN';
if(isset($_GET['lang'])){
  $lang=$_GET['lang'];
  $lang=preg_replace('/[^A-Za-z0-9\-\_]/', '', $lang);
}
if(file_exists("lang/".$lang.".php"))
  include("lang/".$lang.".php");
?>

var note_body='<?php echo JS_ADD_NOTE_BODY;?><hr/><?php echo JS_ADD_NOTE_LIST;?><br/><div id="notes-message"><?php echo PLEASE_WAIT;?></div><hr/><div class="form-group"><label for="text1"><?php echo JS_ADD_NOTE_LABEL;?></label><input type="text" class="form-control" id="text1" placeholder="<?php echo JS_ADD_NOTE_LABEL;?>"></div>';

var lang_status='<?php echo JS_STATUS;?>';
var lang_note='<?php echo JS_NOTE;?>';
var lang_opening_hours='<?php echo JS_OPENING_HOURS;?>';
var lang_basic='<?php echo JS_BASIC;?>';
var lang_key='<?php echo JS_KEY;?>';
var lang_value='<?php echo JS_VALUE;?>';
var lang_report='<?php echo JS_REPORT;?>';
var lang_add_missing_data='<?php echo JS_ADD_MISSING_DATA;?>';
var lang_locate='<?php echo BUTTON_LOCATE;?>';
var lang_stop_locate='<?php echo BUTTON_STOP_LOCATE;?>';
var lang_not_found='<?php echo JS_NOT_FOUND;?>';

