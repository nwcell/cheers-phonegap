<?php
 set_include_path($_SERVER['DOCUMENT_ROOT']);
require_once 'Zend/Db/Adapter/Mysqli.php';
 

$db = new Zend_Db_Adapter_Mysqli(array(
                'host'     =>"localhost",
                'username' =>"cfcthain_cheers" ,
                'password' => "cheers"  ,
                'dbname'   => "cfcthain_cheers"));
 