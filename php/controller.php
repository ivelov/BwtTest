<?php
include 'model.php';

switch ($_POST['action']) {
    case 'getConferences':
        getConfs();
        break;
    
    default:
        print('Unknown action error');
        break;
}


?>