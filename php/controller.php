<?php namespace controller;
include 'model.php';
use model;

class Controller{
    static function reactToAction(string $action)
    {
        switch ($action) 
        {
            case 'getConferences':
                \model\Model::getConfs();
                break;
        
            case 'addConference':
                \model\Model::addConf($_POST['name'],$_POST['date'],$_POST['lat'],$_POST['lon'],$_POST['country']);
                break;
        
            case 'delConference':
                \model\Model::delConf($_POST['id']);
                break;

            case 'getConfDetails':
                \model\Model::getConf($_POST['id']);
                break;
                    
            default:
                print('Error: Unknown action');
                break;
        }
    }
}

Controller::reactToAction($_POST['action']);


?>