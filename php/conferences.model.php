<?php
$user = "root";
$pass = "034320";
function getConfs(): array|false{
    try {
        
        $dbh = new PDO('mysql:host=localhost;dbname=bwttest', $user, $pass);
        $result = ($dbh->query('SELECT * from conferences'))->fetchALL(PDO::FETCH_NUM);        
        $dbh = null;
        return $result;

    } catch (PDOException $e) {
        return false;
        //print "Error!: " . $e->getMessage() . "<br/>";
        die();
    }
}
function addConf(string $name, string $date, string $lat, string $long, string $country){
    try {
        
        $dbh = new PDO('mysql:host=localhost;dbname=bwttest', $user, $pass);
        $result = ($dbh->query('INSERT INTO conferences(name,date,latitude,longitude,country) VALUES(' . 
    $name . ', ' .
    $date . ', ' .
    $lat . ', ' .
    $long . ', ' .
    $country . ')' ));        
        $dbh = null;
        return $result;

    } catch (PDOException $e) {
        return false;
        //print "Error!: " . $e->getMessage() . "<br/>";
        die();
    }
}
?>