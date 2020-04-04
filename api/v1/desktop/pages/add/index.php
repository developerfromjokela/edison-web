<?php
/**
 * Copyright (c) 2020 EdisonWeb.
 * @author Developer From Jokela
 */

require "../../../../../edison_httplib/dependencies_api.php";
$session = getAuth();
$edisonApi = new EdisonApi($session);
$postData = getPost();

// Gets the title and also checks if it exists
$title = getPostParameter('title', $postData);
// Checking the title
if (empty($title))
    apiError(400, "title should not be empty");
$page = $edisonApi->addPage($title, getCSRFToken($session));
apiResponse(array("page" => $page));


