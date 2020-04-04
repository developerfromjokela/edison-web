<?php
/**
 * Copyright (c) 2020 EdisonWeb.
 * @author Developer From Jokela
 */

require "../../../../../edison_httplib/dependencies_api.php";
$session = getAuth();
$edisonApi = new EdisonApi($session);
$postData = getPost();

// Gets the id and also checks if it exists
$id = getPostParameter('id', $postData);
// Checking the id
if (empty($id))
    apiError(400, "id should not be empty");
$page = $edisonApi->deletePage($id, getCSRFToken($session));
apiResponse(array());


