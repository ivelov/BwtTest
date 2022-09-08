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
                \model\Model::addConf($_POST['name'],$_POST['date'],$_POST['lat'],$_POST['long'],$_POST['country']);
                break;
        
            default:
                print('Unknown action error');
                break;
        }
    }
}

Controller::reactToAction($_POST['action']);


?>