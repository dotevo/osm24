<?php

namespace OSM24;

/**
 * Language handling
 *
 * @package OSM24
 * @author Nicolas Hohm <nickel7152@gmail.com>
 */
class Language
{

    /**
     * List of languages supported by the application
     *
     * @var string[]
     */
    private $supported = array();

    /**
     * PHP $_GET
     *
     * @var array
     */
    private $get;

    /**
     * PHP $_SERVER
     *
     * @var array
     */
    private $server;

    /**
     * Set PHP $_GET
     *
     * @param array $get $_GET
     * @return $this
     */
    public function setGet(array $get)
    {
        $this->get = $get;

        return $this;
    }

    /**
     * Set PHP $_SERVER
     *
     * @param array $server $_SERVER
     * @return $this
     */
    public function setServer(array $server)
    {
        $this->server = $server;

        return $this;
    }

    /**
     * Load supported languages from file system
     */
    protected function loadSupported()
    {
        $files = scandir("lang");
        foreach ($files as $file) {
            $filen = explode(".", $file);
            //is lang
            if (strlen($filen[0]) > 0) {
                $locale_code = $filen[0]; //Extention '.php' is dropeed, so 'pt_BR.php' becomes 'pt_BR'
                $filen = explode('_', $locale_code);
                // Add primary language tag
                $this->supported[$filen[0]] = $locale_code;
                //if type pl_PL
                if (count($filen) > 1) {
                    $fullLanguageTag = strtolower($filen[0]) . '-' . strtoupper($filen[1]);
                    $this->supported[$fullLanguageTag] = $locale_code;
                }
            }
        }
    }

    /**
     * Get list of supported languages
     *
     * @return string[]
     */
    public function getSupported()
    {
        if (empty($this->supported)) {
            $this->loadSupported();
        }

        return $this->supported;
    }

    /**
     * Test if given language is supported by application
     *
     * @param string $language
     * @return bool
     */
    public function isSupported($language)
    {
        $supported = $this->getSupported();

        return isset($supported[$language]);
    }

    /**
     * Get browser accepted languages (two-letter primary-tag)
     *
     * @return string[]
     */
    public function getFromBrowser()
    {
        $httpAccepted = &$this->server['HTTP_ACCEPT_LANGUAGE'];
        if (!empty($httpAccepted)) {
            $pattern = '~(([a-z]{1,8})(?:-[a-z]{1,8})?)\s*(;\s*q\s*=\s*(1|0\.[0-9]+))?~i';
            preg_match_all($pattern, $httpAccepted, $langs);

        }

        return (isset($langs[2])) ? array_values(array_unique($langs[2])) : [];
    }

    /**
     * Find most accepted language
     *
     * @return string|null Local code or null if no matches
     */
    public function getSupportedFromBrowser()
    {
        $supported = $this->getSupported();
        $browser = $this->getFromBrowser();
        foreach ($browser as $lang) {
            if (isset($supported[$lang])) {
                return $supported[$lang];
            }
        }
        return null;
    }

}
