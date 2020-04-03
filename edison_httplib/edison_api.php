<?php
/**
 * Copyright (c) 2020 EdisonWeb.
 * @author Developer From Jokela
 */

use GuzzleHttp\Client;
use GuzzleHttp\Cookie\CookieJar;

class EdisonApi
{

    private $client;
    private $session;

    /**
     * EdisonAuthApi constructor.
     */
    public function __construct($session)
    {
        $this->session = $session;

        $this->client = new Client([
            // Base URI is used with relative requests
            'base_uri' => EDISON_BASEPATH."/uiapi/1/",
            // You can set any number of default request options.
            'timeout' => 30.0,
            'http_errors' => false
        ]);
    }

    public function getCards() {
        $response = $this->client->get("dreamcards/cards/all/?format=json", ['cookies' => $this->getSessionJar()]);
        $statuscode =  $response->getStatusCode();
        $json = json_decode($response->getBody(), true);
        if (is_array($json)) {
            if ($statuscode == 200) {
                return $json;
            } else
                apiError($response->getStatusCode(), "Edison rajapintavirhe: ".$json['detail']);
        } else {
            apiError(500, "JSON tekstiä ei voitu jäsentää! ".$response->getBody());
        }


    }

    public function getWilmaSSOKey($ssoURL) {
        $response = $this->client->get($ssoURL, ['cookies' => $this->getSessionJar()]);

    }

    public function getPages() {
        $response = $this->client->get("dreamcards/page/?format=json", ['cookies' => $this->getSessionJar()]);
        $statuscode =  $response->getStatusCode();
        $json = json_decode($response->getBody(), true);
        if (is_array($json)) {
            if ($statuscode == 200) {
                return $json;
            } else
                apiError($response->getStatusCode(), "Edison rajapintavirhe: ".$json['detail']);
        } else {
            apiError(500, "JSON tekstiä ei voitu jäsentää! ".$response->getBody());
        }


    }

    public function getPage($pageId) {
        $response = $this->client->get("dreamcards/page/".$pageId."/?format=json", ['cookies' => $this->getSessionJar()]);
        $statuscode =  $response->getStatusCode();
        $json = json_decode($response->getBody(), true);
        if (is_array($json)) {
            if ($statuscode == 200) {
                return $json;
            } else
                apiError($response->getStatusCode(), "Edison rajapintavirhe: ".$json['detail']);
        } else {
            apiError(500, "JSON tekstiä ei voitu jäsentää! ".$response->getBody());
        }


    }

    /**
     * Getting Wilma session cookies
     * @return CookieJar
     */
    private function getSessionJar() {
        return CookieJar::fromArray([
            'appsid' => $this->session
        ], "app.edison.fi");
    }

}