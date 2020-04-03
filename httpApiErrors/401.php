<?php
/**
 * Copyright (c) 2020 EdisonWeb.
 * @author Developer From Jokela
 */

header("Content-Type: application/json");
http_response_code(401);
echo json_encode(array("status" => false, "cause" => "Authentication required or missing"));
exit;