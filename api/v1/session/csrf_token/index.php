<?php
/**
 * Copyright (c) 2020 EdisonWeb.
 * @author Developer From Jokela
 */

require "../../../../edison_httplib/dependencies_api.php";
$edisonAuthApi = new EdisonAuthApi();

$json_params = file_get_contents("php://input");

if (strlen($json_params) > 0 && isValidJSON($json_params)) {
    $decoded_params = json_decode($json_params, true);
    if (array_key_exists("session", $decoded_params)) {
        $session = $decoded_params['session'];
        $details = $edisonAuthApi->getCSRFToken($session);
        apiResponse(array("csrf" => $details['csrf'], "id" => $details['id']));
        exit;
    } else {
        apiError(400, "API Request is invalid! Session is missing!");
    }

} else {
    apiError(400, "Invalid JSON Body!");
}
