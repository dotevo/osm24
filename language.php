<?php

require_once 'src/Language.php';

use OSM24\Language;

session_start();

// Use lang passed by parameter

if (!empty($_GET['lang'])) {
    $lang = preg_replace('/[^A-Za-z0-9\-\_]/', '', $_GET['lang']);
    $_SESSION['lang'] = $lang;
}

// Try to determine language by HTTP_ACCEPT_LANGUAGE

if (empty($_SESSION['lang'])) {
    $language = new Language();
    $language->setServer($_SERVER);
    $_SESSION['lang'] = $language->getSupportedFromBrowser();
    unset($language);
}

// When worse comes to worse use en_EN

if (empty($_SESSION['lang']) || !file_exists('lang/' . $_SESSION['lang'] . '.php')) {
    $_SESSION['lang'] = 'en_EN';
}

require_once 'lang/' . $_SESSION['lang'] . '.php';

$slang = explode('_', $_SESSION['lang']);
$_SESSION['slang'] = $slang[0];
