<?php
/**
 * Copyright (c) 2020 EdisonWeb.
 * @author Developer From Jokela
 */

require "../../../../edison_httplib/dependencies_api.php";
$session = getAuth();

$edisonApi = new EdisonApi($session);
$pages = $edisonApi->getPages();
$pagesAll = array();
foreach ($pages as $page) {
    array_push($pagesAll, $edisonApi->getPage($page['id']));
}
apiResponse(array("pages" => $pagesAll));
