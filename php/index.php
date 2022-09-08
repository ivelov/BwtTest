<?php

try {
    $user = "root";
    $pass = "034320";
    $dbh = new PDO('mysql:host=localhost;dbname=bwttest', $user, $pass);
    $result = $dbh->query('SELECT * from conferences');
    print_r(json_encode($result->fetchALL(PDO::FETCH_NUM)));
    
    $dbh = null;
} catch (PDOException $e) {
    print "Error!: " . $e->getMessage() . "<br/>";
    die();
}
?>