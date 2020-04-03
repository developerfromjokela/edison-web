<?php
/**
 * Copyright (c) 2020 EdisonWeb.
 * @author Developer From Jokela
 */

header("Content-Type: application/json");

http_response_code(500);
echo json_encode(array("status" => false, "cause" => "Internal Server error, something went wrong on the server"));
exit;