<?php
/**
 * Copyright (c) 2020 EdisonWeb.
 * @author Developer From Jokela
 */

require "components/config.php";
require "components/head.php";

?>


<div ng-controller="WebCtl" id="popupContainer" ng-cloak="" ng-app="EdisonWeb" style="width: 100% " layout-fill>
    <div ng-view layout-fill></div>

</div>



<?php
require "components/footer.php"?>
