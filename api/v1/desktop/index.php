<?php
/**
 * Copyright (c) 2020 EdisonWeb.
 * @author Developer From Jokela
 */

require "../../../edison_httplib/dependencies_api.php";
$session = getAuth();
$edisonApi = new EdisonApi($session);
$cards = $edisonApi->getCards();
$pages = $edisonApi->getPages();
$pagesAll = array();
foreach ($pages as $page) {
    array_push($pagesAll, $edisonApi->getPage($page['id']));
}
apiResponse(array("cards" => $cards, "pages" => $pagesAll));
