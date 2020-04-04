<?php
/**
 * Copyright (c) 2020 EdisonWeb.
 * @author Developer From Jokela
 */

require "../../../../edison_httplib/dependencies_api.php";
$edisonAuthApi = new EdisonAuthApi();

$postData = getPost();
if (array_key_exists("session", $postData)) {
    $session = $postData['session'];
    $details = $edisonAuthApi->getCSRFToken($session);
    apiResponse(array("csrf" => $details['csrf'], "id" => $details['id']));
    exit;
} else {
    apiError(400, "API Request is invalid! Session is missing!");
}