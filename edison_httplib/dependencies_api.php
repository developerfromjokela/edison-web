<?php
/**
 * Copyright (c) 2020 EdisonWeb.
 * @author Developer From Jokela
 */

header("Content-Type: application/json;");

define("EDISON_BASEPATH", "https://app.edison.fi");
define("EDISON_ID_BASEPATH", "https://id.edison.fi");
// TODO Change your basepath if you wish
define("BASEPATH", dirname(dirname(__FILE__))."/");
require BASEPATH."vendor/autoload.php";
require BASEPATH."edison_httplib/edison_authapi.php";
require BASEPATH."edison_httplib/edison_api.php";

function apiError($status, $cause) {
    http_response_code($status);
    echo json_encode(array("status" => false, "cause" => $cause, "code" => $status));
    exit;
}


function apiResponse($data) {
    http_response_code(200);
    echo json_encode(array_merge(array("status" => true), $data));
    exit;
}

function apiServerError( int $errno , string $errstr ,string $errfile , int $errline , array $errcontext) {
    apiError(520, "dfj-server-".$errno.": ".$errstr." line ".$errline." file ".$errfile);
}

function apiException($e) {
    apiError(520, $e->getMessage()." Line: ".$e->getLine()." File: ".$e->getFile());

}

function isValidJSON($str) {
    json_decode($str);
    return json_last_error() == JSON_ERROR_NONE;
}

function getAuth() {
    $token = null;
    $headers = apache_request_headers();
    if(isset($headers['Authorization'])){
        $session = $headers['Authorization'];
        $edisonAuthApi = new EdisonAuthApi();
        $edisonAuthApi->validateAuthentication($session);
        return $session;
    } else {
        apiError(401, "No authentication presented. Check the 'Authorization' header");
    }
}

//set error handlers
set_error_handler("apiServerError");
set_exception_handler("apiException");