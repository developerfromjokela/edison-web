<!DOCTYPE html>
<html>
<head>
    <title><?php echo TITLE; ?></title>
    <base href="<?php echo BASEURL ?>">
    <script>
        var baseURL = "<?php echo substr(BASEURL, 0, -1)?>";
    </script>

    <?php
    setDependencies(HEAD_DEPENDENCIES);
    ?>
</head>
<body>
