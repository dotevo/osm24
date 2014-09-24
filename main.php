<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">
    <meta name="fragment" content="!">
    <link rel="shortcut icon" href="../../assets/ico/favicon.png">
    <title>osm24.eu</title>
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="css/leaflet.css" />
    <link rel="stylesheet" href="css/MarkerCluster.css"/>
    <link rel="stylesheet" href="css/MarkerCluster.Default.css"/>
    <link rel="stylesheet" href="css/leaflet.contextmenu.css"/>
    <link rel="stylesheet" href="css/Control.NominatimGeocoder.css"/>
    <link href="css/slider.css" rel="stylesheet">
    <link href="css/datepicker.css" rel="stylesheet">
    <!--[if lte IE 8]>
      <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.6.4/leaflet.ie.css" />
    <![endif]-->
    <script src="js_lang.php?lang=<?php echo $lang;?>"></script>
    <script src="http://code.jquery.com/jquery-2.0.2.js">{"parsetags": "explicit"}</script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/leaflet.js"></script>
    <script src="js/leaflet.markercluster.js"></script>
    <script src="http://coinwidget.com/widget/coin.js"></script>
    <script src="js/i18next.js"></script>
    <script src="js/leaflet-hash.js"></script>
    <script src="js/leaflet-timeslider.js"></script>
    <script src="js/Control.NominatimGeocoder.js"></script>
    <script src="js/suncalc.js"></script>
    <script src="js/snap.min.js"></script>
    <script src="js/leaflet.label.min.js"></script>
    <script src="js/bootstrap-slider.js"></script>
    <script src="js/bootstrap-datepicker.js"></script>
    <script src="js/leaflet.contextmenu.js"></script>
    <script type="text/javascript" src="https://apis.google.com/js/plusone.js"></script>
    <script src="js/easyoverpass.js"></script>
    <script src="js/opening_hours.js"></script>  
    <link href="css/style.css" rel="stylesheet">
    <link href="css/leaflet.label.css" rel="stylesheet">
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-51879555-1', 'osm24.eu');
  ga('send', 'pageview');

</script>
  </head>
  <body>
  <div class="snap-drawers">
    <div class="snap-drawer snap-drawer-left">
      <h4>POI List</h4>
      <div class="item active">
        <ul class="list-group scroll-menu" id="poilist">
        </ul>
      </div>
      <button class="btn navbar-btn" id="export_csv"><i class="glyphicon glyphicon-export"></i></button>
    </div>
  </div>

  <div id="content" class="snap-content" style="padding-top: 50px;">
    <div class="navbar navbar-inverse navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
           <button type="button" class="navbar-toggle" style="height:40px" data-toggle="collapse" data-target=".navbar-collapse">
             Menu
           </button><table><tr><td>
          <a id="open-left"></a></td><td>
          <i class="navbar-brand">osm24.eu</i></td></tr></table>
        </div>
        <div class="collapse navbar-collapse global-menu-data">
          <ul class="nav navbar-nav">
            <li class="dropdown  btn-group btn-group-own ">
              <a class="dropdown-toggle btn-select" id="type" data-toggle="dropdown"><span class="caret"></span></a>
              <ul class="dropdown-menu select-one-change sort">
                <li><a id="all"  data-tag-pair="['amenity'='restaurant']@['amenity'='fast_food']@['amenity'='cafe']@['amenity'='ice_cream']@[shop]@[office]@[craft]@[sport]@[amenity=toilets]@[amenity=drinking_water]@['amenity'='pub']@['amenity'='bar']@['amenity'='nightclub']@['amenity'='biergarten']@['amenity'='stripclub']@[amenity='pharmacy']@[amenity='fuel']@['amenity'='bank']@['amenity'='atm']@['amenity'='cinema']@['amenity'='theatre']@['amenity'='college']@['amenity'='library']@['amenity'='university']@['amenity'='kindergarten']@[tourism]@['amenity'='clinic']@['amenity'='hospital']@['amenity'='dentist']@['amenity'='doctors']@['amenity'='veterinary']@['amenity'='social_facility']@['emergency'='ambulance_station']@['emergency'='defibrillator']" data-tag-type="main" data-i18n="All"></a></li>
                <li class="divider"></li>
                <li><a id="craft" data-i18n="Craft"></a></li>
                <li><a id="health" data-i18n="Health"></a></li>
                <li><a id="eat" data-tag-pair="['amenity'='restaurant']@['amenity'='fast_food']@['amenity'='cafe']@['amenity'='ice_cream']" data-tag-type="main" data-i18n="Food"></a></li>
                <li><a id="money" data-i18n="Money"></a></li>
                <li><a id="need" data-i18n="Needs"></a></li>
                <li><a id="office" data-i18n="Office"></a></li>
                <li><a id="party" data-i18n="Fun"></a></li>
                <li><a id="exercise" data-i18n="Sport"></a></li>
                <li><a id="education" data-i18n="Education"></a></li>
                <li><a id="tourism" data-i18n="Tourism"></a></li>
                <li><a id="buy" data-i18n="Shop"></a></li>
                <li><a id="culture" data-tag-pair="['amenity'='cinema']@['amenity'='theatre']" data-tag-type="main" data-i18n="Culture"></a></li>
              </ul>
            </li>

            <li class="dropdown  btn-group btn-group-own  visible-eat">
              <a class="dropdown-toggle btn-select" id="cuisine" data-toggle="dropdown" data-arrow><span data-i18n="Cuisine"></span><span class="caret"></span></a>
              <ul class="dropdown-menu select-one dropdown-menu-long tag-parent" data-tag-key="cuisine" data-tag-char="~">
                <li><a id="c-all" data-tag-pair="$$" data-i18n="All"></a></li>
                <li class="divider"></li>
                <li><a id="bagel" data-i18n="Bagel"></a></li>
                <li><a id="barbecue" data-i18n="Barbecue"></a></li>
                <li><a id="bougatsa" data-i18n="Bougatsa"></a></li>
                <li><a id="burger" data-i18n="Burger"></a></li>
                <li><a id="cake" data-i18n="Cake"></a></li>
                <li><a id="chicken" data-i18n="Chicken"></a></li>
                <li><a id="coffee_shop" data-i18n="Coffee shop" data-tag-exclude="['amenity'='cafe']"></a></li>
                <li><a id="crepe" data-i18n="Crepe"></a></li>
                <li><a id="couscous" data-i18n="Couscous"></a></li>
                <li><a id="curry" data-i18n="Curry"></a></li>
                <li><a id="donut" data-i18n="Donut"></a></li>
                <li><a id="doughnut" data-i18n="Doughnut"></a></li>
                <li><a id="empanada" data-i18n="Empanada"></a></li>
                <li><a id="fish_and_chips" data-i18n="Fish and chips"></a></li>
                <li><a id="fried_food" data-i18n="Fried food"></a></li>
                <li><a id="friture" data-i18n="Friture"></a></li>
                <li><a id="ice_cream" data-i18n="Ice cream" data-tag-exclude="['amenity'='ice_cream']"></a></li>
                <li><a id="kebab" data-i18n="Kebab"></a></li>
                <li><a id="mediterranean" data-i18n="Mediterranean"></a></li>
                <li><a id="noodle" data-i18n="Noodle"></a></li>
                <li><a id="pancake" data-i18n="Pancake"></a></li>
                <li><a id="pasta" data-i18n="Pasta"></a></li>
                <li><a id="pie" data-i18n="Pie"></a></li>
                <li><a id="pizza" data-i18n="Pizza"></a></li>
                <li><a id="regional" data-i18n="Regional"></a></li>
                <li><a id="sandwich" data-i18n="Sandwich"></a></li>
                <li><a id="sausage" data-i18n="Sausage"></a></li>
                <li><a id="savory_pancakes" data-i18n="Savory pancakes"></a></li>
                <li><a id="seafood" data-i18n="Seafood"></a></li>
                <li><a id="steak_house" data-i18n="Steak house"></a></li>
                <li><a id="sushi" data-i18n="Sushi"></a></li>
                <li class="divider"></li>
                <li><a id="african" data-i18n="African"></a></li>
                <li><a id="american" data-i18n="American"></a></li>
                <li><a id="arab" data-i18n="Arab"></a></li>
                <li><a id="argentinian" data-i18n="Argentinian"></a></li>
                <li><a id="asian" data-i18n="Asian"></a></li>
                <li><a id="baiana" data-i18n="Baiana"></a></li>
                <li><a id="balkan" data-i18n="Balkan"></a></li>
                <li><a id="basque" data-i18n="Basque"></a></li>
                <li><a id="bavarian" data-i18n="Bavarian"></a></li>
                <li><a id="brazilian" data-i18n="Brazilian"></a></li>
                <li><a id="cantonese" data-i18n="Cantonese"></a></li>
                <li><a id="capixaba" data-i18n="Capixaba"></a></li>
                <li><a id="caribbean" data-i18n="Caribbean"></a></li>
                <li><a id="chinese" data-i18n="Chinese"></a></li>
                <li><a id="croatian" data-i18n="Croatian"></a></li>
                <li><a id="czech" data-i18n="Czech"></a></li>
                <li><a id="french" data-i18n="French"></a></li>
                <li><a id="german" data-i18n="German"></a></li>
                <li><a id="greek" data-i18n="Greek"></a></li>
                <li><a id="gaucho" data-i18n="Gaucho"></a></li>
                <li><a id="hunan" data-i18n="Hunan"></a></li>
                <li><a id="hungarian" data-i18n="Hungarian"></a></li>
                <li><a id="indian" data-i18n="Indian"></a></li>
                <li><a id="international" data-i18n="International"></a></li>
                <li><a id="iranian" data-i18n="Iranian"></a></li>
                <li><a id="italian" data-i18n="Italian"></a></li>
                <li><a id="japanese" data-i18n="Japanese"></a></li>
                <li><a id="kyo_ryouri" data-i18n="Kyo ryouri"></a></li>
                <li><a id="korean" data-i18n="Korean"></a></li>
                <li><a id="latin_american" data-i18n="Latin american"></a></li>
                <li><a id="lebanese" data-i18n="Lebanese"></a></li>
                <li><a id="mexican" data-i18n="Mexican"></a></li>
                <li><a id="mineira" data-i18n="Mineira"></a></li>
                <li><a id="okinawa_ryori" data-i18n="Okinawa ryori"></a></li>
                <li><a id="peruvian" data-i18n="Peruvian"></a></li>
                <li><a id="polish" data-i18n="Polish"></a></li>
                <li><a id="portuguese" data-i18n="Portuguese"></a></li>
                <li><a id="russian" data-i18n="Russian"></a></li>
                <li><a id="shandong" data-i18n="Shandong"></a></li>
                <li><a id="sichuan" data-i18n="Sichuan"></a></li>
                <li><a id="spanish" data-i18n="Spanish"></a></li>
                <li><a id="thai" data-i18n="Thai"></a></li>
                <li><a id="turkish" data-i18n="Turkish"></a></li>
              </ul>
            </li>

            <li class="dropdown  btn-group btn-group-own  visible-money">
              <a class="dropdown-toggle btn-select tag-default" id="mon" data-toggle="dropdown" data-default-id="place_all" data-arrow data-i18n="All"><span class="caret"></span></a>
              <ul class="dropdown-menu select-one dropdown-menu-long tag-parent">
                <li><a id="place_all" data-tag-pair="['amenity'='bank']@['amenity'='atm']" data-tag-type="main" data-i18n="All"></a></li>
                <li class="divider"></li>
                <li><a id="bank" data-tag-pair="['amenity'='bank']" data-tag-type="main" data-i18n="Bank"></a></li>
                <li><a id="atm" data-tag-pair="['amenity'='atm']@[atm=yes]" data-tag-type="main" data-i18n="ATM"></a></li>
              </ul>
            </li>

            <li class="dropdown  btn-group btn-group-own visible-money">
              <a class="dropdown-toggle btn-select" id="currency" data-toggle="dropdown" data-i18n="Currency"><span class="caret"></span></a>
              <ul class="dropdown-menu dropdown-always-on  tag-parent">
                <li class="dropdown-header" data-i18n="Include"></li>
                <li class="select-multi-state"><a id="currency_eur" data-tag-pair-s1="['currency:EUR'~'yes|only']"><span style="display:none;" class="glyphicon glyphicon-ok state1"></span><span data-i18n="EUR"></span></a></li>
                <li class="select-multi-state"><a id="currency_pln" data-tag-pair-s1="['currency:PLN'~'yes|only']"><span style="display:none;" class="glyphicon glyphicon-ok state1"></span><span data-i18n="PLN"></span></a></li>
                <li class="select-multi-state"><a id="currency_rub" data-tag-pair-s1="['currency:RUB'~'yes|only']"><span style="display:none;" class="glyphicon glyphicon-ok state1"></span><span data-i18n="RUB"></span></a></li>
                <li class="select-multi-state"><a id="currency_usd" data-tag-pair-s1="['currency:USD'~'yes|only']"><span style="display:none;" class="glyphicon glyphicon-ok state1"></span><span data-i18n="USD"></span></a></li>
                <li class="divider"></li>
                <li class="dropdown-header" data-i18n="Cryptocurrencies"></li>
                <li class="select-multi-state"><a id="currency_xbt" data-tag-pair-s1="['currency:XBT'~'yes|only']"><span style="display:none;" class="glyphicon glyphicon-ok state1"></span><span data-i18n="XBT (BTC)"></span></a></li>
              </ul>
            </li>


            <li class="dropdown  btn-group btn-group-own  visible-eat">
              <a class="dropdown-toggle btn-select" id="diet" data-toggle="dropdown" data-i18n="Diet"><span class="caret"></span></a>
              <ul class="dropdown-menu dropdown-always-on  tag-parent">
                <li class="dropdown-header" data-i18n="No set/Yes/Only"></li>
                <li class="select-multi-state">
<a id="pescetarian" data-tag-pair-s1="['diet:vegetarian'~'yes|only']@['diet:ovo_vegetarian'~'yes|only']@['diet:lacto_vegetarian'~'yes|only']@['diet:vegan'~'yes|only']@['diet:fruitarian'~'yes|only']" data-tag-pair-s2="['diet:pescetarian'='only']">
<span style="display:none;" class="glyphicon glyphicon-ok state1"></span><span style="display:none;" class="glyphicon glyphicon-ok-sign state2"></span><span data-i18n="Pescetarian"></span></a></li>
                <li class="select-multi-state">
<a id="vegetarian" data-tag-pair-s1="['diet:vegetarian'~'yes|only']@['diet:ovo_vegetarian'~'yes|only']@['diet:lacto_vegetarian'~'yes|only']@['diet:vegan'~'yes|only']@['diet:fruitarian'~'yes|only']" data-tag-pair-s2="['diet:vegetarian'='only']">
<span style="display:none;" class="glyphicon glyphicon-ok state1"></span><span style="display:none;" class="glyphicon glyphicon-ok-sign state2"></span><span data-i18n="Vegetarian"></span></a></li>
                <li class="select-multi-state">
<a id="lacto_vegetarian" data-tag-pair-s1="['diet:lacto_vegetarian'~'yes|only']@['diet:vegan'~'yes|only']@['diet:fruitarian'~'yes|only']" data-tag-pair-s2="['diet:lacto_vegetarian'='only']">
<span style="display:none;" class="glyphicon glyphicon-ok state1"></span><span style="display:none;" class="glyphicon glyphicon-ok-sign state2"></span><span data-i18n="Lacto vegetarian"></span></a></li>
                <li class="select-multi-state">
<a id="ovo_vegetarian" data-tag-pair-s1="['diet:ovo_vegetarian'~'yes|only']@['diet:vegan'~'yes|only']@['diet:fruitarian'~'yes|only']" data-tag-pair-s2="['diet:ovo_vegetarian'='only']">
<span style="display:none;" class="glyphicon glyphicon-ok state1"></span><span style="display:none;" class="glyphicon glyphicon-ok-sign state2"></span><span data-i18n="Ovo vegetarian"></span></a></li>
                <li class="select-multi-state">
<a id="vegan" data-tag-pair-s1="['diet:vegan'~'yes|only']@['diet:fruitarian'~'yes|only']" data-tag-pair-s2="['diet:vegan'='only']">
<span style="display:none;" class="glyphicon glyphicon-ok state1"></span><span style="display:none;" class="glyphicon glyphicon-ok-sign state2"></span><span data-i18n="Vegan"></span></a></li>
                <li class="select-multi-state">
<a id="fruitarian" data-tag-pair-s1="['diet:fruitarian'~'yes|only']" data-tag-pair-s2="['diet:fruitarian'='only']">
<span style="display:none;" class="glyphicon glyphicon-ok state1"></span><span style="display:none;" class="glyphicon glyphicon-ok-sign state2"></span><span data-i18n="Fruitarian"></span></a></li>
                <li class="select-multi-state">
<a id="raw" data-tag-pair-s1="['diet:raw'~'yes|only']" data-tag-pair-s2="['diet:raw'='only']">
<span style="display:none;" class="glyphicon glyphicon-ok state1"></span><span style="display:none;" class="glyphicon glyphicon-ok-sign state2"></span><span data-i18n="Raw"></span></a></li>
                <li class="select-multi-state">
<a id="gluten_free" data-tag-pair-s1="['diet:gluten_free'~'yes|only']" data-tag-pair-s2="['diet:gluten_free'='only']">
<span style="display:none;" class="glyphicon glyphicon-ok state1"></span><span style="display:none;" class="glyphicon glyphicon-ok-sign state2"></span><span data-i18n="Gluten free"></span></a></li>
                <li class="select-multi-state">
<a id="dairy_free" data-tag-pair-s1="['diet:dairy_free'~'yes|only']" data-tag-pair-s2="['diet:dairy_free'='only']">
<span style="display:none;" class="glyphicon glyphicon-ok state1"></span><span style="display:none;" class="glyphicon glyphicon-ok-sign state2"></span><span data-i18n="Dairy free"></span></a></li>
                <li class="select-multi-state">
<a id="lactose_free" data-tag-pair-s1="['diet:lactose_free'~'yes|only']" data-tag-pair-s2="['diet:lactose_free'='only']">
<span style="display:none;" class="glyphicon glyphicon-ok state1"></span><span style="display:none;" class="glyphicon glyphicon-ok-sign state2"></span><span data-i18n="Lactose free"></span></a></li>
                <li class="select-multi-state">
<a id="halal" data-tag-pair-s1="['diet:halal'~'yes|only']" data-tag-pair-s2="['diet:halal'='only']">
<span style="display:none;" class="glyphicon glyphicon-ok state1"></span><span style="display:none;" class="glyphicon glyphicon-ok-sign state2"></span><span data-i18n="Halal"></span></a></li>
              </ul>
            </li>

            <li style="display:none;" class="dropdown  btn-group btn-group-own  visible-party">
              <a class="dropdown-toggle btn-select" id="where" data-toggle="dropdown" data-i18n="Where"><span class="caret"></span></a>
              <ul class="dropdown-menu dropdown-always-on  tag-parent">
                <li class="dropdown-header" data-i18n="Exclude"></li>
                <li class="select-multi-state"><a id="pub" data-tag-pair-s0="['amenity'='pub']" data-tag-type="main"><span class="glyphicon glyphicon-ok state0"></span><span style="display:none;" class="glyphicon glyphicon-remove state1"></span><span data-i18n="Pub"></span></a></li> 
                <li class="select-multi-state"><a id="bar"  data-tag-pair-s0="['amenity'='bar']" data-tag-type="main"><span class="glyphicon glyphicon-ok state0"></span><span style="display:none;" class="glyphicon glyphicon-remove state1"></span><span data-i18n="Bar"></span></a></li>
                <li class="select-multi-state"><a id="nightclub" data-tag-pair-s0="['amenity'='nightclub']" data-tag-type="main"><span class="glyphicon glyphicon-ok state0"></span><span style="display:none;" class="glyphicon glyphicon-remove state1"></span><span data-i18n="Nightclub"></span></a></li>
                <li class="select-multi-state"><a id="biergarten" data-tag-pair-s0="['amenity'='biergarten']" data-tag-type="main"><span class="glyphicon glyphicon-ok state0"></span><span style="display:none;" class="glyphicon glyphicon-remove state1"></span><span data-i18n="Biergarten"></span></a></li>
                <li class="select-multi-state"><a id="stripclub" data-tag-pair-s0="['amenity'='stripclub']" data-tag-type="main"><span class="glyphicon glyphicon-ok state0"></span><span style="display:none;" class="glyphicon glyphicon-remove state1"></span><span data-i18n="Stripclub"></span></a></li>
              </ul>
            </li>

            <li style="display:none;" class="dropdown  btn-group btn-group-own visible-party">
              <a class="dropdown-toggle btn-select" id="beer" data-toggle="dropdown" data-i18n="Beer"><span class="caret"></span></a>
              <ul class="dropdown-menu dropdown-always-on  tag-parent">
                <li class="select-multi-state"><a id="microbrewery" data-tag-pair-s1="['microbrewery'='yes']"><span style="display:none;" class="glyphicon glyphicon-ok state1"></span><span data-i18n="Microbrewery"></span></a></li>
                <li class="select-multi-state"><a id="real_cider" data-tag-pair-s1="['real_cider'='yes']"><span style="display:none;" class="glyphicon glyphicon-ok state1"></span><span data-i18n="Real cider"></span></a></li>
                <li class="select-multi-state"><a id="real_ale" data-tag-pair-s1="['real_ale'='yes']"><span style="display:none;" class="glyphicon glyphicon-ok state1"></span><span data-i18n="Real ALE"></span></a></li>
                <li>
                  <input type="text" data-tag-key="brewery" data-tag-value='@' data-tag-char="~" class="form-control select-text" style="height:30px" data-i18n-placeholder="ex. Heineken" placeholder="" id="brewery">
                </li>
              </ul>
            </li>

            <li style="display:none;" class="dropdown  btn-group btn-group-own  visible-health">
              <a class="dropdown-toggle btn-select" id="health-list" data-toggle="dropdown" data-i18n="List"><span class="caret"></span></a>
              <ul class="dropdown-menu dropdown-always-on  tag-parent">
                <li class="dropdown-header" data-i18n="Include"></li>
                <li class="select-multi-state"><a id="hclinic" data-tag-pair-s0="['amenity'='clinic']" data-tag-type="main"><span class="glyphicon glyphicon-ok state0"></span><span style="display:none;" class="glyphicon glyphicon-remove state1"></span><span data-i18n="Clinic"></span></a></li>
                <li class="select-multi-state"><a id="hhospital" data-tag-pair-s0="['amenity'='hospital']" data-tag-type="main"><span class="glyphicon glyphicon-ok state0"></span><span style="display:none;" class="glyphicon glyphicon-remove state1"></span><span data-i18n="Hospital"></span></a></li>
                <li class="select-multi-state"><a id="hdentist" data-tag-pair-s0="['amenity'='dentist']" data-tag-type="main"><span class="glyphicon glyphicon-ok state0"></span><span style="display:none;" class="glyphicon glyphicon-remove state1"></span><span data-i18n="Dentist"></span></a></li>
                <li class="select-multi-state"><a id="hdoctors" data-tag-pair-s0="['amenity'='doctors']" data-tag-type="main"><span class="glyphicon glyphicon-ok state0"></span><span style="display:none;" class="glyphicon glyphicon-remove state1"></span><span data-i18n="Doctors"></span></a></li>
                <li class="select-multi-state"><a id="hpharmacy" data-tag-pair-s0="['amenity'='pharmacy']" data-tag-type="main"><span class="glyphicon glyphicon-ok state0"></span><span style="display:none;" class="glyphicon glyphicon-remove state1"></span><span data-i18n="Pharmacy"></span></a></li>
                <li class="select-multi-state"><a id="hvet" data-tag-pair-s0="['amenity'='veterinary']" data-tag-type="main"><span class="glyphicon glyphicon-ok state0"></span><span style="display:none;" class="glyphicon glyphicon-remove state1"></span><span data-i18n="Veterinary"></span></a></li>
                <li class="select-multi-state"><a id="hsocial" data-tag-pair-s0="['amenity'='social_facility']" data-tag-type="main"><span class="glyphicon glyphicon-ok state0"></span><span style="display:none;" class="glyphicon glyphicon-remove state1"></span><span data-i18n="Social facility"></span></a></li>
                <li class="select-multi-state"><a id="hambulance" data-tag-pair-s0="['emergency'='ambulance_station']" data-tag-type="main"><span class="glyphicon glyphicon-ok state0"></span><span style="display:none;" class="glyphicon glyphicon-remove state1"></span><span data-i18n="Ambulance station"></span></a></li>
                <li class="select-multi-state"><a id="hdefibrillator" data-tag-pair-s0="['emergency'='defibrillator']" data-tag-type="main"><span class="glyphicon glyphicon-ok state0"></span><span style="display:none;" class="glyphicon glyphicon-remove state1"></span><span data-i18n="Defibrillator"></span></a></li>
              </ul>
            </li>

            <li style="display:none;" class="dropdown  btn-group btn-group-own  visible-office">
              <a class="dropdown-toggle btn-select tag-default" id="office" data-toggle="dropdown" data-default-id="office_all" data-arrow data-i18="List"><span class="caret"></span></a>
              <ul class="dropdown-menu select-one dropdown-menu-long tag-parent">
                <li><a id="office_all" data-tag-pair="[office]" data-tag-type="main" data-i18n="All"></a></li>
                <li class="divider"></li>
                <li><a id="office_accountant" data-tag-pair="[office=accountant]" data-tag-type="main" data-i18n="Accountant"></a></li>
                <li><a id="office_administrative" data-tag-pair="[office=administrative]" data-tag-type="main" data-i18n="Administrative"></a></li>
                <li><a id="office_architect" data-tag-pair="[office=architect]" data-tag-type="main" data-i18n="Architect"></a></li>
                <li><a id="office_association" data-tag-pair="[office=association]" data-tag-type="main" data-i18n="Association"></a></li>
                <li><a id="office_lawyer" data-tag-pair="[office=lawyer]" data-tag-type="main" data-i18n="Lawyer"></a></li>
                <li><a id="office_notary" data-tag-pair="[office=notary]" data-tag-type="main" data-i18n="Notary"></a></li>
              </ul>
            </li>

            <li style="display:none;" class="dropdown  btn-group btn-group-own  visible-craft">
              <a class="dropdown-toggle btn-select tag-default" id="craft" data-toggle="dropdown" data-default-id="craft_all" data-arrow data-i18n="List"><span class="caret"></span></a>
              <ul class="dropdown-menu select-one dropdown-menu-long tag-parent">
                <li><a id="craft_all" data-tag-pair="[craft]" data-tag-type="main" data-i18n="All"></a></li>
                <li class="divider"></li>
                <li><a id="craft_carpenter" data-tag-pair="[craft=carpenter]" data-tag-type="main" data-i18n="Carpenter"></a></li>
                <li><a id="craft_clockmaker" data-tag-pair="[craft=clockmaker]" data-tag-type="main" data-i18n="Clockmaker"></a></li>
                <li><a id="craft_glaziery" data-tag-pair="[craft=glaziery]" data-tag-type="main" data-i18n="Glaziery"></a></li>
                <li><a id="craft_photographer" data-tag-pair="[craft=photographer]" data-tag-type="main" data-i18n="Photographer"></a></li>

              </ul>
            </li>

            <li style="display:none;" class="dropdown  btn-group btn-group-own  visible-need">
              <a class="dropdown-toggle btn-select" id="need" data-toggle="dropdown" data-i18n="List"><span class="caret"></span></a>
              <ul class="dropdown-menu dropdown-always-on  tag-parent">
                <li class="dropdown-header" data-i18n="Include"></li>
                <li class="select-multi-state"><a id="toilets" data-tag-pair-s0="['amenity'='toilets']" data-tag-type="main"><span class="glyphicon glyphicon-ok state0"></span><span style="display:none;" class="glyphicon glyphicon-remove state1"></span><span data-i18n="Toilets"></span></a></li>
                <li class="select-multi-state"><a id="drinking_water" data-tag-pair-s0="['amenity'='drinking_water']" data-tag-type="main"><span class="glyphicon glyphicon-ok state0"></span><span style="display:none;" class="glyphicon glyphicon-remove state1"></span><span data-i18n="Drinking water"></span></a></li>
                <li class="select-multi-state"><a id="shelter" data-tag-pair-s0="['amenity'='shelter']" data-tag-type="main"><span class="glyphicon glyphicon-ok state0"></span><span style="display:none;" class="glyphicon glyphicon-remove state1"></span><span data-i18n="Shelter"></span></a></li>
              </ul>
            </li>

            <li class="dropdown  btn-group btn-group-own  visible-party" style="display:none">
              <a class="dropdown-toggle btn-select" id="access" data-toggle="dropdown" data-i18n="Access"><span class="caret"></span></a>
              <ul class="dropdown-menu dropdown-always-on  tag-parent">
                <li class="dropdown-header" data-i18n="No set/Yes/Only"></li>
                <li class="select-multi-state"><a id="male" data-tag-pair-s1="['male'~'yes|only']" data-tag-pair-s2="['male'='only']"><span style="display:none;" class="glyphicon glyphicon-ok state1"></span><span style="display:none;" class="glyphicon glyphicon-ok-sign state2"></span><span data-i18n="Male"></span></a></li>
                <li class="select-multi-state"><a id="female" data-tag-pair-s1="['female'~'yes|only']" data-tag-pair-s2="['female'='only']"><span style="display:none;" class="glyphicon glyphicon-ok state1"></span><span style="display:none;" class="glyphicon glyphicon-ok-sign state2"></span><span data-i18n="Famale"></span></a></li>
                <li class="select-multi-state"><a id="gay"  data-tag-pair-s1="['gay'~'yes|only|welcome']" data-tag-pair-s2="['gay'='only']"><span style="display:none;" class="glyphicon glyphicon-ok state1"></span><span style="display:none;" class="glyphicon glyphicon-ok-sign state2"></span><span data-i18n="Gay"></span></a></li>
              </ul>
            </li>

            <li style="display:none;" class="dropdown  btn-group btn-group-own  visible-buy">
              <a class="dropdown-toggle btn-select tag-default" id="store" data-toggle="dropdown" data-default-id="store_all" data-arrow data-i18n="List">><span class="caret"></span></a>
              <ul class="dropdown-menu select-one dropdown-menu-long tag-parent">
                <li><a id="store_all" data-tag-pair="[shop]@[amenity='pharmacy']@[office=travel_agency]@[amenity='fuel']" data-tag-type="main" data-i18n="All"></a></li>
                <li class="divider"></li>
                <li><a id="store_alcohol" data-tag-pair="[shop=alcohol]@[shop]['alcohol'='yes']" data-tag-type="main" data-i18n="Alcohol"></a></li>
                <li><a id="store_art" data-tag-pair="[shop=art]@[shop=music]" data-tag-type="main" data-i18n="Art"></a></li>
                <li><a id="store_clothes" data-tag-pair="[shop=clothes]@[shop=shoes]@[shop=second_hand]" data-tag-type="main" data-i18n="Clothes"></a></li>
                <li><a id="store_food" data-tag-pair="[shop=supermarket]@[shop=bakery]@[shop=butcher]@[shop=convenience]@[shop=farm]@[shop=greengrocer]@[shop=seafood]@[shop=confectionery]" data-tag-type="main" data-i18n="Food"></a></li>
                <li><a id="store_electronic" data-tag-pair="[shop='computer']@[shop=mobile_phone]@[shop=electronics]" data-tag-type="main" data-i18n="Electronic"></a></li>
                <li><a id="store_health" data-tag-pair="[amenity='pharmacy']@[shop=chemist]@[shop=hairdresser]@[shop=beauty]" data-tag-type="main" data-i18n="Health and beauty"></a></li>
                <li><a id="store_transport" data-tag-pair="[shop=car]@[shop=bicycle]@[shop=motorcycle]@[shop=tyres]@[amenity='fuel']" data-tag-type="main" data-i18n="Transport"></a></li>
                <li><a id="store_travel" data-tag-pair="[shop=travel_agency]@[office=travel_agency]" data-tag-type="main" data-i18n="Travel"></a></li>
              </ul>
            </li>

            <li style="display:none;" class="dropdown  btn-group btn-group-own  visible-exercise">
              <a class="dropdown-toggle btn-select" id="exercise_where" data-toggle="dropdown" data-i18n="List"><span class="caret"></span></a>
              <ul class="dropdown-menu dropdown-always-on  tag-parent">
                <li class="dropdown-header" data-i18n="Include"></li>
                <li class="select-multi-state"><a id="sport_centre" data-tag-pair-s0="['leisure'='sports_centre']" data-tag-type="main"><span class="glyphicon glyphicon-ok state0"></span><span style="display:none;" class="glyphicon glyphicon-remove state1"></span><span data-i18n="Sport centre"></span></a></li> 
                <li class="select-multi-state"><a id="pitch"  data-tag-pair-s0="['leisure'='pitch']" data-tag-type="main"><span class="glyphicon glyphicon-ok state0"></span><span style="display:none;" class="glyphicon glyphicon-remove state1"></span><span data-i18n="Pitch"></span></a></li>
                <li class="select-multi-state"><a id="stadium"  data-tag-pair-s0="['leisure'='stadium']" data-tag-type="main"><span class="glyphicon glyphicon-ok state0"></span><span style="display:none;" class="glyphicon glyphicon-remove state1"></span><span data-i18n="Stadium"></span></a></li>
                <li class="select-multi-state"><a id="swimming_pool" data-tag-pair-s0="['leisure'='swimming_pool']" data-tag-type="main"><span class="glyphicon glyphicon-ok state0"></span><span style="display:none;" class="glyphicon glyphicon-remove state1"></span><span data-i18n="Swimming pool"></span></a></li>
                <li class="select-multi-state"><a id="track" data-tag-pair-s0="['leisure'='track']" data-tag-type="main"><span class="glyphicon glyphicon-ok state0"></span><span style="display:none;" class="glyphicon glyphicon-remove state1"></span><span data-i18n="Track"></span></a></li>
                <li class="select-multi-state"><a id="other_a" data-tag-pair-s0="[sport]" data-tag-type="main"><span class="glyphicon glyphicon-ok state0"></span><span style="display:none;" class="glyphicon glyphicon-remove state1"></span><span data-i18n="Other"></span></a></li>
              </ul>
            </li>

            <li style="display:none;" class="dropdown  btn-group btn-group-own  visible-exercise">
              <a class="dropdown-toggle btn-select" id="sport" data-toggle="dropdown" data-arrow data-i18n="Sport"><span class="caret"></span></a>
              <ul class="dropdown-menu select-one dropdown-menu-long tag-parent" data-tag-key="sport" data-tag-char="~">
                <li><a id="sport-all" data-tag-pair="$$" data-i18n="All"></a></li>
                <li class="divider"></li>	
                <li><a id="9pin" data-i18n="9pin"></a></li>
                <li><a id="10pin" data-i18n="10pin"></a></li>
                <li><a id="american_football" data-i18n="American football"></a></li>
                <li><a id="aikido" data-i18n="Aikido"></a></li>
                <li><a id="archery" data-i18n="Archery"></a></li>
                <li><a id="athletics" data-i18n="Athletics"></a></li>
                <li><a id="australian_football" data-i18n="Australian football"></a></li>
                <li><a id="base" data-i18n="Base"></a></li>
                <li><a id="badminton" data-i18n="Badminton"></a></li>
                <li><a id="baseball" data-i18n="Baseball"></a></li>
                <li><a id="basketball" data-i18n="Basketball"></a></li>
                <li><a id="beachvolleyball" data-i18n="Beach volleyball"></a></li>
                <li><a id="bmx" data-i18n="BMX"></a></li>
                <li><a id="boules" data-i18n="Boules"></a></li>
                <li><a id="bowls" data-i18n="Bowls"></a></li>
                <li><a id="boxing" data-i18n="Boxing"></a></li>
                <li><a id="canadian_football" data-i18n="Canadian football"></a></li>
                <li><a id="canoe" data-i18n="Canoe"></a></li>
                <li><a id="chess" data-i18n="Chess"></a></li>
                <li><a id="climbing" data-i18n="Climbing"></a></li>
                <li><a id="cricket" data-i18n="Cricket"></a></li>
                <li><a id="cricket_nets" data-i18n="Cricket nets"></a></li>
                <li><a id="croquet" data-i18n="Croquet"></a></li>
                <li><a id="cycling" data-i18n="Cycling"></a></li>
                <li><a id="diving" data-i18n="Diving"></a></li>
                <li><a id="dog_racing" data-i18n="Dog racing"></a></li>
                <li><a id="fencing" data-i18n="Fencing"></a></li>
                <li><a id="equestrian" data-i18n="Equestrian"></a></li>
                <li><a id="free_flying" data-i18n="Free flying"></a></li>
                <li><a id="gaelic_games" data-i18n="Gaelic games"></a></li>
                <li><a id="golf" data-i18n="Golf"></a></li>
                <li><a id="gymnastics" data-i18n="Gymnastics"></a></li>
                <li><a id="hockey" data-i18n="Hockey"></a></li>
                <li><a id="horseshoes" data-i18n="Horseshoes"></a></li>
                <li><a id="horse_racing" data-i18n="Horse racing"></a></li>
                <li><a id="ice_stock" data-i18n="Ice stock"></a></li>
                <li><a id="judo" data-i18n="Judo"></a></li>
                <li><a id="karting" data-i18n="Karting"></a></li>
                <li><a id="kitesurfing" data-i18n="Kitesurfing"></a></li>
                <li><a id="korfball" data-i18n="Korfball"></a></li>
                <li><a id="motor" data-i18n="Motor"></a></li>
                <li><a id="obstacle_course" data-i18n="Obstacle course"></a></li>
                <li><a id="orienteering" data-i18n="Orienteering"></a></li>
                <li><a id="paddle_tennis" data-i18n="Paddle tennis"></a></li>
                <li><a id="paragliding" data-i18n="Paragliding"></a></li>
                <li><a id="pelota" data-i18n="Pelota"></a></li>
                <li><a id="racquet" data-i18n="Racquet"></a></li>
                <li><a id="rowing" data-i18n="Rowing"></a></li>
                <li><a id="rugby_league" data-i18n="Rugby league"></a></li>
                <li><a id="rugby_union" data-i18n="Rugby union"></a></li>
                <li><a id="running" data-i18n="Running"></a></li>
                <li><a id="scuba_diving" data-i18n="Scuba diving"></a></li>
                <li><a id="shooting" data-i18n="Shooting"></a></li>
                <li><a id="skating" data-i18n="Skating"></a></li>
                <li><a id="skateboard" data-i18n="Skateboard"></a></li>
                <li><a id="skiing" data-i18n="Skiing"></a></li>
                <li><a id="soccer" data-i18n="Soccer"></a></li>
                <li><a id="surfing" data-i18n="Surfing"></a></li>
                <li><a id="swimming" data-i18n="Swimming"></a></li>
                <li><a id="table_tennis" data-i18n="Table tennis"></a></li>
                <li><a id="taekwondo" data-i18n="Taekwondo"></a></li>
                <li><a id="team_handball" data-i18n="Team handball"></a></li>
                <li><a id="tennis" data-i18n="Tennis"></a></li>
                <li><a id="toboggan" data-i18n="Toboggan"></a></li>
                <li><a id="volleyball" data-i18n="Volleyball"></a></li>
                <li><a id="water_ski" data-i18n="Water ski"></a></li>
                <li><a id="weightlifting" data-i18n="Weightlifting"></a></li>
                <li><a id="wrestling" data-i18n="Wrestling"></a></li>
              </ul>
            </li>


            <li style="display:none;" class="dropdown  btn-group btn-group-own  visible-culture">
              <a class="dropdown-toggle btn-select tag-default" id="theatre_genre" data-toggle="dropdown" data-default-id="theatre_genre_all" data-arrow data-i18n="Genre"><span class="caret"></span></a>
              <ul class="dropdown-menu select-one dropdown-menu-long tag-parent">
                <li><a id="theatre_genre_all" data-i18n="All"></a></li>
                <li class="divider"></li>
                <li data-i18n="Speech theatre"></li>
                <li><a id="theatre_genre_drama" data-tag-pair="['theatre:genre'~'drama']" data-i18n="Drama"></a></li>
                <li><a id="theatre_genre_comedy" data-tag-pair="['theatre:genre'~'comedy']" data-i18n="Comedy"></a></li>
                <li data-i18n="Music theatre"></li>
                <li><a id="theatre_genre_opera" data-tag-pair="['theatre:genre'~'opera']" data-i18n="Opera"></a></li>
                <li><a id="theatre_genre_musical" data-tag-pair="['theatre:genre'~'musical']" data-i18n="Musical"></a></li>
                <li><a id="theatre_genre_ballet" data-tag-pair="['theatre:genre'~'ballet']" data-i18n="Ballet"></a></li>
                <li><a id="theatre_genre_philharmonic" data-tag-pair="['theatre:genre'~'philharmonic']" data-i18n="Philharmonic"></a></li>
                <li><a id="theatre_genre_chamber_music" data-tag-pair="['theatre:genre'~'chamber_music']" data-i18n="Chamber music"></a></li>
                <li data-i18n="Other theatre"></li>
                <li><a id="theatre_genre_cabaret" data-tag-pair="['theatre:genre'~'cabaret']" data-i18n="Cabaret"></a></li>
                <li><a id="theatre_genre_boulevard" data-tag-pair="['theatre:genre'~'boulevard']" data-i18n="Boulevard"></a></li>
                <li><a id="theatre_genre_circus" data-tag-pair="['theatre:genre'~'circus']" data-i18n="Cirsus"></a></li>
                <li><a id="theatre_genre_stand_up_comedy" data-tag-pair="['theatre:genre'~'stand_up_comedy']" data-i18n="Stand up comedy"></a></li>
                <li><a id="theatre_genre_political" data-tag-pair="['theatre:genre'~'political']" data-i18n="Political"></a></li>
                <li><a id="theatre_genre_variaté" data-tag-pair="['theatre:genre'~'variaté']" data-i18n="Variate"></a></li>
                <li data-i18n="Puppet theatre">></li>
                <li><a id="theatre_genre_figure" data-tag-pair="['theatre:genre'~'figure']" data-i18n="Figure"></a></li>
                <li><a id="theatre_genre_puppet" data-tag-pair="['theatre:genre'~'puppet']" data-i18n="Puppet"></a></li>
                <li><a id="theatre_genre_marionette" data-tag-pair="['theatre:genre'~'marionette']" data-i18n="Marionette"></a></li>
                <li><a id="theatre_genre_shadow_play" data-tag-pair="['theatre:genre'~'shadow_play']" data-i18n="Shadow play"></a></li>
              </ul>
            </li>

            <li style="display:none;" class="dropdown  btn-group btn-group-own  visible-education">
              <a class="dropdown-toggle btn-select" id="education_type" data-toggle="dropdown" data-i18n="List"><span class="caret"></span></a>
              <ul class="dropdown-menu dropdown-always-on  tag-parent">
                <li class="dropdown-header" data-i18n="Include"></li>
                <li class="select-multi-state"><a id="library" data-tag-pair-s0="['amenity'='library']" data-tag-type="main"><span class="glyphicon glyphicon-ok state0"></span><span style="display:none;" class="glyphicon glyphicon-remove state1"></span><span data-i18n="Library"></span></a></li> 
                <li class="select-multi-state"><a id="kindergarten"  data-tag-pair-s0="['amenity'='kindergarten']" data-tag-type="main"><span class="glyphicon glyphicon-ok state0"></span><span style="display:none;" class="glyphicon glyphicon-remove state1"></span><span data-i18n="Kindergarten"></span></a></li>		
                <li class="select-multi-state"><a id="school"  data-tag-pair-s0="['amenity'='school']" data-tag-type="main"><span class="glyphicon glyphicon-ok state0"></span><span style="display:none;" class="glyphicon glyphicon-remove state1"></span><span data-i18n="School"></span></a></li>
                <li class="select-multi-state"><a id="university"  data-tag-pair-s0="['amenity'='university']" data-tag-type="main"><span class="glyphicon glyphicon-ok state0"></span><span style="display:none;" class="glyphicon glyphicon-remove state1"></span><span data-i18n="University"></span></a></li>
                <li class="select-multi-state"><a id="college"  data-tag-pair-s0="['amenity'='college']" data-tag-type="main"><span class="glyphicon glyphicon-ok state0"></span><span style="display:none;" class="glyphicon glyphicon-remove state1"></span><span data-i18n="Collage"></span></a></li>
              </ul>
            </li>

            <li style="display:none;" class="dropdown  btn-group btn-group-own  visible-tourism">
              <a class="dropdown-toggle btn-select tag-default" id="tourism_type" data-toggle="dropdown" data-default-id="tourism_all" data-arrow data-i18n="List"><span class="caret"></span></a>
              <ul class="dropdown-menu select-one dropdown-menu-long tag-parent">
                <li><a id="tourism_all" data-tag-pair="[tourism]" data-tag-type="main" data-i18n="All"></a></li>
                <li class="divider"></li>
                <li><a id="tourism_attraction" data-tag-pair="[tourism=attraction]@[tourism=viewpoint]@[tourism=museum]@[tourism=theme_park]@[tourism@zoo]" data-tag-type="main" data-i18n="Attraction"></a></li>
                <li><a id="tourism_accommodation" data-tag-pair="[tourism=hotel]@[tourism=hostel]@[tourism=guest_house]@[tourism=camp_site]@[tourism=caravan_site]@[tourism=motel]@[tourism=alpine_hut]" data-tag-type="main" data-i18n="Accommodation"></a></li>
                <li><a id="tourism_information" data-tag-pair="[tourism=information]" data-tag-type="main" data-i18n="Information"></a></li>
              </ul>
            </li>

            <li class="dropdown  btn-group btn-group-own">
              <a class="dropdown-toggle btn-select" id="payment" data-toggle="dropdown" data-i18n="Payment"><span class="caret"></span></a>
              <ul class="dropdown-menu dropdown-always-on  tag-parent">
                <li class="dropdown-header" data-i18n="Include"></li>
                <li class="select-multi-state"><a id="payment_coins" data-tag-pair-s1="['payment:coins'~'yes|only']"><span style="display:none;" class="glyphicon glyphicon-ok state1"></span><span data-i18n="Coins"></span></a></li>
                <li class="select-multi-state"><a id="payment_debit_cards" data-tag-pair-s1="['payment:debit_cards'~'yes|only']"><span style="display:none;" class="glyphicon glyphicon-ok state1"></span><span data-i18n="Debit cards"></span></a></li>
                <li class="select-multi-state"><a id="payment_credit_cards" data-tag-pair-s1="['payment:credit_cards'~'yes|only']"><span style="display:none;" class="glyphicon glyphicon-ok state1"></span><span data-i18n="Credit cards"></span></a></li>
                <li class="select-multi-state"><a id="payment_bitcoin" data-tag-pair-s1="['payment:bitcoin'~'yes|only']"><span style="display:none;" class="glyphicon glyphicon-ok state1"></span><span data-i18n="Bitcoin"></span></a></li>
                <li class="select-multi-state"><a id="payment_litecoin" data-tag-pair-s1="['payment:litecoin'~'yes|only']"><span style="display:none;" class="glyphicon glyphicon-ok state1"></span><span data-i18n="Litecoin"></span></a></li>
                <li class="select-multi-state"><a id="payment_peercoin" data-tag-pair-s1="['payment:peercoin'~'yes|only']"><span style="display:none;" class="glyphicon glyphicon-ok state1"></span><span data-i18n="Peercoin"></span></a></li>
              </ul>
            </li>

            <li class="dropdown  btn-group btn-group-own ">
              <a class="dropdown-toggle btn-select" id="other" data-toggle="dropdown" data-i18n="Other"><span class="caret"></span></a>
              <ul class="dropdown-menu dropdown-always-on  tag-parent">
                <li class="dropdown-header" data-i18n="Include"></li>
                <li class="visible-eat select-multi-state"><a id="takeaway" data-tag-pair-s1="['takeaway'='yes']"><span style="display:none;" class="glyphicon glyphicon-ok state1"></span><span data-i18n="Take away"></span></a></li>
                <li class="visible-eat select-multi-state"><a id="delivery" data-tag-pair-s1="['delivery'='yes']"><span style="display:none;" class="glyphicon glyphicon-ok state1"></span><span data-i18n="Delivery"></span></a></li>
                <li class="select-multi-state"><a id="wheelchair" data-tag-pair-s1="['wheelchair'='yes']"><span style="display:none;" class="glyphicon glyphicon-ok state1"></span><span data-i18n="Wheelchair"></span></a></li>

                <li class="dropdown-header visible-eat visible-party" data-i18n="Internet"></li>
                <li class="dropdown-submenu btn-group-own visible-eat visible-party main">
                  <a tabindex="-1" id="internet" class="dropdown-toggle" data-i18n="Empty"></a>
                  <ul class="dropdown-menu select-one tag-parent" data-tag-key="internet_access">
                  <li><a id="int_empty" data-tag-pair="$$" data-i18n="Empty"></a></li>
                  <li><a id="int_no" data-tag-value="no" data-i18n="No"></a></li>
                  <li><a id="int_yes" data-tag-pair='["internet_access"~"wlan|yes|wired|public|terminal"]' data-i18n="Yes"></a></li>
                  <li><a id="int_free" data-tag-pair="['internet_access:fee'='no']" data-i18n="Free"></a></li>
                  <li><a id="int_wlan" data-tag-value="wlan" data-i18n="Wlan"></a></li>
                  </ul>
                </li>

                <li class="dropdown-header visible-eat visible-party" data-i18n="Smoking"></li>
                <li class="dropdown-submenu btn-group-own visible-eat visible-party main">
                  <a tabindex="-1" id="smoking" class="dropdown-toggle" data-i18n="Empty"></a>
                  <ul class="dropdown-menu select-one tag-parent" data-tag-key="smoking">
                  <li><a id="empty" data-tag-pair="$$" data-i18n="Empty"></a></li>
                  <li><a id="no" data-tag-value="no" data-i18n="No"></a></li>
                  <li><a id="yes" data-tag-pair="['smoking'~'yes|dedicated|isolated|separated']" data-i18n="Yes"></a></li>
                  <li><a id="dedicated" data-tag-value="dedicated" data-i18n="Dedicated"></a></li>
                  <li><a id="isolated" data-tag-value="isolated" data-i18n="Isolated"></a></li>
                  <li><a id="separated" data-tag-value="separated" data-i18n="Separated"></a></li>
                  </ul>
                </li>
              </ul>
            </li>
         </ul>

         <ul class="nav navbar-nav navbar-right">
          <li class="dropdown">
            <a class="dropdown-toggle" style="padding: 4px; margin: 0px" data-toggle="dropdown">
              <img src="img/flags/<?php echo $_SESSION['lang'];?>.png"/>
            <b class="caret"></b>
            </a>
            <ul class="dropdown-menu flags">
              <li><a href="?lang=en_EN"><img src="img/flags/en_EN.png"/></a></li>
              <li><a href="?lang=it_IT"><img src="img/flags/it_IT.png"/></a></li>
              <li><a href="?lang=ru_RU"><img src="img/flags/ru_RU.png"/></a></li>
            </ul>
          </li>
          <li><button onclick="ustaw()" type="button" class="btn btn-primary navbar-btn" data-i18n="Set"></button></li>
        </ul>
      </div><!--/.nav-collapse -->
    </div>
  </div>
  <div style="height: 100%" id="map"></div>
  </div>

  <!-- Modal -->
  <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          <h4 class="modal-title">Gdzie   <script>
            CoinWidgetCom.go({
                wallet_address: "1ErU8U4bREFeUWywiBFjj3sCXudMqhEjCf"
              , currency: "bitcoin"
              , counter: "count"
              , alignment: "bl"
              , qrcode: true
              , auto_show: false
              , lbl_button: "Donate"
              , lbl_address: "My Bitcoin Address:"
              , lbl_count: "donations"
              , lbl_amount: "BTC"
              });
          </script><div id='main-plus' size="small" data-href='http://osm24.eu'></div></h4>
          <hr/>
        </div>
        <div class="modal-body">
          <img src="http://www.openstreetmap.org/assets/osm_logo-79d71f6a51b0e6a724a570834c07d828.png" alt="OpenStreetMap Logo"/><br/>
          <?php echo POPUP_ABOUT_BODY;?>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal" data-i18n="Close"></button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="dynModal" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          <h3 class="modal-title"></h3>
        </div>
        <div class="modal-body">  
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal" data-i18n="Close"></button>
          <button type="button" class="btn btn-primary callback-btn" data-dismiss="modal" data-i18n="Add"></button>
        </div>
      </div>
    </div>
  </div>

  <script type="text/javascript">
i18n.init({ resGetPath: 'locales/__lng__.json' });
i18n.init(function(t) {
$("[data-i18n]").i18n();
});
</script>
  <script src="js/own_bootstrap.js"></script>
  <script src="js/query.js"></script>
  <script src="js/poi.js"></script>
  <script src="js/main.js"></script>
  </body>
</html>
