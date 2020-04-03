<?php
/**
 * Copyright (c) 2020 EdisonWeb.
 * @author Developer From Jokela
 */

require "../../../../edison_httplib/dependencies_api.php";
$session = getAuth();

if (!isset($_GET['sso_url']))
    apiError(400, "sso_url is missing");

$ssoURL = $_GET['sso_url'];
$edisonApi = new EdisonApi($session);
$url = $edisonApi->getWilmaSSOURL($ssoURL);
if (!empty($url))
    apiResponse(array("sso" => $url[0]));
else
    apiError(500, array("SSO url not found from Edison"));
