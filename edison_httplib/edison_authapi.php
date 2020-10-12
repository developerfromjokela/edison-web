<?php
/*
 * Copyright (c) 2020 EdisonWeb.
 * @author Developer From Jokela
 */

use GuzzleHttp\Client;
use GuzzleHttp\Cookie\CookieJar;

class EdisonAuthApi
{

    private $client;

    /**
     * EdisonAuthApi constructor.
     */
    public function __construct()
    {

        $this->client = new Client([
            // Base URI is used with relative requests
            'base_uri' => EDISON_BASEPATH,
            // You can set any number of default request options.
            'timeout' => 30.0,
            'http_errors' => false
        ]);
    }

    public function getCSRFToken($sessionId) {

        $response = $this->client->get("/", ['cookies' => $this->getSessionJar($sessionId)]);
        $statuscode =  $response->getStatusCode();
        if ($statuscode == 200) {
            $header = $response->getHeader("Set-Cookie");
            if (empty($header))
                apiError(401, "Invalid session, can't get the CSRF Token");
            else {
                $cookies = array();
                $id = 0;
                if (preg_match("/id: [0-9]*/", $response->getBody(),$match)) {
                    $id = $match[0];
                    if (preg_match("/\d+/", $id, $match2)) {
                        $id = intval($match2[0]);
                    }
                }
                foreach ($header as $item) {
                    preg_match_all('/^([^;]*)/mi', $item, $matches);
                    foreach($matches[1] as $item) {
                        parse_str($item, $cookie);
                        $cookies = array_merge($cookies, $cookie);
                    }
                }
                if (!array_key_exists("csrftoken", $cookies))
                    apiError(401, "Invalid session, can't get the CSRF Token");
                return array("csrf" => $cookies['csrftoken'], "id" => $id);
            }
        } else
            apiError(401, "Invalid session, can't get the CSRF Token");

    }


    public function validateAuthentication($sessionId) {
         $response = $this->client->get("/uiapi/1/?format=json", ['cookies' => $this->getSessionJar($sessionId)]);
        $statuscode =  $response->getStatusCode();
        if ($statuscode == 200) {
            return true;
        } else if ($statuscode == 403)
            apiError(403, "Session is invalid!");
    }

    /**
     * Getting Wilma session cookies
     * @return CookieJar
     */
    private function getSessionJar($sessionId) {
        return CookieJar::fromArray([
            'appsid' => $sessionId
        ], "app.edison.fi");
    }

}