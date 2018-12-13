<?php
    $url = './data.json';
    $json = file_get_contents($url);
    $json_data = json_decode($json, true);

    echo json_encode($json_data);
?>