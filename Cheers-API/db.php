<?php
 set_include_path($_SERVER['DOCUMENT_ROOT']);
require_once 'Zend/Db/Adapter/Mysqli.php';
 

$db = new Zend_Db_Adapter_Mysqli(array(
                'host'     =>"localhost",
                'username' =>"nwcell_cheers" ,
                'password' => "cheers16554"  ,
                'dbname'   => "nwcell_cheers"));
 