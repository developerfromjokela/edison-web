<?php
/**
 * Copyright (c) 2020 EdisonWeb.
 * @author Developer From Jokela
 */

header("Content-Type: application/json");

http_response_code(402);
echo json_encode(array("status" => false, "cause" => "Payment Required"));
exit;