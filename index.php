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

    <!-- Pre-Rendered Dialog-->
    <script type="text/ng-template" id="progress_dialog.html">
        <md-dialog aria-describedby="dialogContent_4" aria-label="appsid" class="_md md-transition-in"
                   ng-class="dialog.css" role="dialog" style="" tabindex="-1">
            <md-progress-linear md-mode="indeterminate" md-theme="login_progress"></md-progress-linear>
            <md-dialog-content class="md-dialog-content" id="dialogContent_4" role="document" tabindex="-1">
                <h2 class="md-title ng-binding">{{ title }}</h2>
                <!-- ngIf: ::dialog.mdHtmlContent -->
                <!-- ngIf: ::!dialog.mdHtmlContent -->
                <div class="md-dialog-content-body ng-scope" style="">
                    <p class="ng-binding">{{ msg }}</p>
                </div>
                <!-- end ngIf: ::!dialog.mdHtmlContent -->
            </md-dialog-content>
        </md-dialog>
    </script>
</div>



<?php
require "components/footer.php"?>
