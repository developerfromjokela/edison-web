<!DOCTYPE html>
<html>
<head>
    <title><?php echo TITLE; ?></title>
    <base href="<?php echo BASEURL ?>">
    <script>
        var baseURL = "<?php echo BASEURL?>";
        var wilmaClientBaseURL = "<?php echo BASEURL . 'wilmaclient/'?>";
        var edisonURL = "<?php echo EDISON_BASEPATH ?>";
        var serverYear = "<?php echo date("Y")?>";
    </script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <?php
    setDependencies(HEAD_DEPENDENCIES);
    ?>
</head>
<body>
