<?php
/**
 * Copyright (c) 2020 EdisonWeb.
 * @author Developer From Jokela
 */

header("Content-Type: application/json");

http_response_code(403);
echo json_encode(array("status" => false, "cause" => "Forbidden, you don't have permission to access this resource."));
exit;