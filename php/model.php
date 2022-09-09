<?php namespace model;
use \PDO;
class Model{

    //Temorary using this user
    private static $user = "root";
    private static $pass = "034320";

    //Displays all confs data base have
    static function getConfs(){
        try {
            //connecting to db
            $dbh = new PDO('mysql:host=localhost;dbname=bwttest', self::$user, self::$pass);

            foreach($dbh->query('SELECT * from conferences') as $row) {
                $name = $row['name'];
                $id = $row['id'];
                $date = $row['date'];

                //adding tr to display
                include 'tableRow.php';
            }
            //closing connection
            $dbh = null;
        } catch (PDOException $e) {
            print "Error!: " . $e->getMessage() . "<br/>";
            die();
        }
    }

    //Adds conf to db
    static function addConf(string $name, string $date, string $lat, string $lon, string $country){
        try {
            
            $dbh = new PDO('mysql:host=localhost;dbname=bwttest', self::$user, self::$pass);
            $result = ($dbh->query('INSERT INTO conferences(name,date,latitude,longitude,country) VALUES("' . 
        $name . '", "' .
        $date . '", "' .
        $lat . '", "' .
        $lon . '", "' .
        $country . '")' ));       
            //closing connection 
            $dbh = null;
             
            print_r($result->fetchALL());

        } catch (PDOException $e) {
            print "Error!: " . $e->getMessage() . "<br/>";
            die();
        }
    }

    //Deletes conf by id
    static function delConf(int $id){
        try {
            //connecting to db
            $dbh = new PDO('mysql:host=localhost;dbname=bwttest', self::$user, self::$pass);
            
            $result = $dbh->query('DELETE from conferences WHERE id=' . $id);
            //closing connection
            $dbh = null;
            print_r($result->fetchALL());
        } catch (PDOException $e) {
            print "Error!: " . $e->getMessage() . "<br/>";
            die();
        }
    }
}

?>