<?php

namespace OSM24;

/**
 * Language handling
 *
 * @package OSM24
 * @author Nicolas Hohm <nickel7152@gmail.com>
 */
class LanguageTest extends \PHPUnit_Framework_TestCase
{

    /**
     * @var Language
     */
    private $sut;

    protected function setUp()
    {
        $this->sut = new Language();
    }

    public function testGetSupported()
    {
        $actual = $this->sut->getSupported();
        $subset = ['en' => 'en_EN', 'en-EN' => 'en_EN'];
        $this->assertArraySubset($subset, $actual);
    }

    public function testIsSupported()
    {
        $this->assertTrue($this->sut->isSupported('en'));
        $this->assertFalse($this->sut->isSupported('foo'));
    }

    public function testGetFromBrowserMissing()
    {
        $actual = $this->sut->getFromBrowser();
        $this->assertSame([], $actual);
    }

    public function testGetFromBrowser()
    {
        $this->sut->setServer(['HTTP_ACCEPT_LANGUAGE' => 'en-ca,en;q=0.8,en-us;q=0.6,de-de;q=0.4,de;q=0.2']);
        $actual = $this->sut->getFromBrowser();
        $this->assertSame(['en', 'de'], $actual);
    }

    public function testGetSupportedFromBrowser()
    {
        $this->sut->setServer(['HTTP_ACCEPT_LANGUAGE' => 'en-ca,en;q=0.8,en-us;q=0.6,de-de;q=0.4,de;q=0.2']);
        $this->assertTrue($this->sut->isSupported('en'));
        $this->assertFalse($this->sut->isSupported('en-ca'));
        $actual = $this->sut->getSupportedFromBrowser();
        $this->assertSame('en_EN', $actual);
    }

    public function testGetSupportedFromBrowserSimple()
    {
        $this->sut->setServer(['HTTP_ACCEPT_LANGUAGE' => 'en-US']);
        $this->assertTrue($this->sut->isSupported('en'));
        $this->assertFalse($this->sut->isSupported('en-US'));
        $actual = $this->sut->getSupportedFromBrowser();
        $this->assertSame('en_EN', $actual);
    }

}
