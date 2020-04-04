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
     * EdisonApi constructor.
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
                apiError($response->getStatusCode(), "Edison rajapintavirhe: " . $json['detail']);
        } else {
            apiError(500, "JSON tekstiä ei voitu jäsentää! " . $response->getBody());
        }


    }

    public function getWilmaSSOURL($ssoURL)
    {
        $response = $this->client->get($ssoURL, ['cookies' => $this->getSessionJar(), 'allow_redirects' => false]);
        if ($response->getStatusCode() === 302)
            return $response->getHeader("Location");
        else
            apiError(500, "SSO error: " . $response->getBody());
    }

    public function getPages()
    {
        $response = $this->client->get("dreamcards/page/?format=json", ['cookies' => $this->getSessionJar()]);
        $statuscode = $response->getStatusCode();
        $json = json_decode($response->getBody(), true);
        if (is_array($json)) {
            if ($statuscode == 200) {
                return $json;
            } else
                apiError($response->getStatusCode(), "Edison rajapintavirhe: " . $json['detail']);
        } else {
            apiError(500, "JSON tekstiä ei voitu jäsentää! " . $response->getBody());
        }


    }

    public function getPage($pageId)
    {
        $response = $this->client->get("dreamcards/page/" . $pageId . "/?format=json", ['cookies' => $this->getSessionJar()]);
        $statuscode = $response->getStatusCode();
        $json = json_decode($response->getBody(), true);
        if (is_array($json)) {
            if ($statuscode == 200) {
                return $json;
            } else
                apiError($statuscode, "Edison rajapintavirhe: " . $json['detail']);
        } else {
            apiError(500, "JSON tekstiä ei voitu jäsentää! " . $response->getBody());
        }


    }

    public function addPage($title, $csrfToken)
    {
        $response = $this->client->post("dreamcards/page/?format=json", [GuzzleHttp\RequestOptions::JSON => ['title' => $title], 'cookies' => $this->getPostSessionJar($csrfToken),
            'headers' => ["Referer" => "https://app.edison.fi/", "X-CSRFToken" => $csrfToken['csrf']]]);
        $statuscode = $response->getStatusCode();
        $json = json_decode($response->getBody(), true);
        if (is_array($json)) {
            if ($statuscode == 201) {
                return $json;
            } else
                apiError($statuscode, "Edison rajapintavirhe: " . $json['detail']);
        } else {
            apiError(500, "JSON tekstiä ei voitu jäsentää! " . $response->getBody());
        }
    }

    public function deletePage($pageId, $csrfToken)
    {
        $response = $this->client->delete("dreamcards/page/" . $pageId . "/?format=json", ['cookies' => $this->getPostSessionJar($csrfToken),
            'headers' => ["Referer" => EDISON_BASEPATH, "X-CSRFToken" => $csrfToken['csrf']]]);
        $statuscode = $response->getStatusCode();
        $json = json_decode($response->getBody(), true);
        if ($statuscode == 204) {
            return true;
        } else if ($statuscode == 404) {
            apiError(404, "Poistettavaa sivua ei löydy. Tarkista ID ja yritä uudelleen");
        } else {
            if (is_array($json))
                apiError($statuscode, "Edison rajapintavirhe: " . $json['detail']);
            else
                apiError(500, "JSON tekstiä ei voitu jäsentää! " . $response->getBody());
        }
    }

    /**
     * Getting Edison session cookies
     * @return CookieJar
     */
    private function getSessionJar()
    {
        return CookieJar::fromArray([
            'appsid' => $this->session
        ], "app.edison.fi");
    }

    /**
     * Getting Edison session cookies with the CSRF Token
     * @return CookieJar
     */
    private function getPostSessionJar($csrfToken)
    {
        return CookieJar::fromArray([
            'appsid' => $this->session,
            'csrftoken' => $csrfToken['csrf']
        ], "app.edison.fi");
    }

}