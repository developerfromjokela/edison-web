<!DOCTYPE html>
<html>
<head>
    <title><?php echo TITLE; ?></title>
    <base href="<?php echo BASEURL ?>">
    <script>
        var baseURL = "<?php echo BASEURL?>";
        var edisonURL = "<?php echo EDISON_BASEPATH ?>";
        var serverYear = "<?php echo date("Y")?>";
    </script>

    <?php
    setDependencies(HEAD_DEPENDENCIES);
    ?>
</head>
<body>
