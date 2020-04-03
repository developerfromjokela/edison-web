<?php
/**
 * Copyright (c) 2020 EdisonWeb.
 * @author Developer From Jokela
 */

require "../../../../edison_httplib/dependencies_api.php";
$session = getAuth();

// TODO create a proxy to get SSO key for WIlma
$edisonApi = new EdisonApi($session);
$cards = $edisonApi->getCards();
apiResponse(array("cards" => $cards));
