<?php namespace model;
use \PDO;
class Model{

    //Temorary using this user
    private static $user = "root";
    private static $pass = "034320";

     
    //Returns all conferences in html format (tableRow.php)
    static function getConfs(){
        try {
            //connecting to db
            $dbh = new PDO('mysql:host=localhost;dbname=bwttest', self::$user, self::$pass);

            foreach($dbh->query('SELECT * FROM conferences') as $row) {
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
            $dbh = new PDO('mysql:host=localhost;dbname=bwttest', self::$user, self::$pass);
            $result = $dbh->query('DELETE FROM conferences WHERE id=' . $id);

            $dbh = null;

            print_r($result->fetchALL());
        } catch (PDOException $e) {
            print "Error!: " . $e->getMessage() . "<br/>";
            die();
        }
    }

    //Returns details of conf by id
    static function getConf(int $id){
        try {
            $dbh = new PDO('mysql:host=localhost;dbname=bwttest', self::$user, self::$pass);
            $result = $dbh->query('SELECT * FROM conferences WHERE id=' . $id);

            $dbh = null;

            print(json_encode($result->fetchALL(PDO::FETCH_ASSOC)));
        } catch (PDOException $e) {
            print "Error!: " . $e->getMessage() . "<br/>";
            die();
        }
    }

    //Updates conference
    static function updConf(int $id, string $name, string $date, string $lat, string $lon, string $country){
        try {
            //connecting to db
            $dbh = new PDO('mysql:host=localhost;dbname=bwttest', self::$user, self::$pass);
            
            $result = $dbh->query('UPDATE conferences SET name="' . $name . 
            '", date="' . $date .
            '", latitude="' . $lat .
            '", longitude="' . $lon .
            '", country="' . $country . '" WHERE id=' . $id);

            $dbh = null;
            
            print_r($result->fetchALL());
        } catch (PDOException $e) {
            print "Error!: " . $e->getMessage() . "<br/>";
            die();
        }
    }
}

?>