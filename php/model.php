<?php namespace model;
use \PDO;
class Model{

    //Temorary using this user
    private static $user = "root";
    private static $pass = "034320";

    //Displays all confs data base have
    static function getConfs(){
        try {
            //global $user, $pass;

            //connecting to db
            $dbh = new PDO('mysql:host=localhost;dbname=bwttest', self::$user, self::$pass);

            //$result = ($dbh->query('SELECT * from conferences'))->fetchALL(PDO::FETCH_NUM);    

            foreach($dbh->query('SELECT * from conferences') as $row) {
                $name = $row['name'];
                $id = $row['id'];
                $date = $row['date'];

                include 'tableRow.php';
            }
            $dbh = null;
        } catch (PDOException $e) {
            print "Error!: " . $e->getMessage() . "<br/>";
            die();
        }
    }

    //Adds conf to db
    static function addConf(string $name, string $date, string $lat, string $long, string $country){
        try {
            
            $dbh = new PDO('mysql:host=localhost;dbname=bwttest', self::$user, self::$pass);
            $result = ($dbh->query('INSERT INTO conferences(name,date,latitude,longitude,country) VALUES("' . 
        $name . '", "' .
        $date . '", "' .
        $lat . '", "' .
        $long . '", "' .
        $country . '")' ));        
            $dbh = null;
            print_r($result->fetchALL());

        } catch (PDOException $e) {
            print "Error!: " . $e->getMessage() . "<br/>";
            die();
        }
    }
}

?>