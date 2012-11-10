<?php
//logStuffs();

require_once ('db.php');
require_once ('functions.php');

$radius_check = 0.18; //in miles

$action = getForm("action");
$id     = getForm("id");
$lat    = getForm("lat");
$lon    = getForm("lon");

//@todo create a token for direct auth

//get business within the geo
if ($action  == 'getgeo'){
    $lat = getForm('lat');
    $lng = getForm('lng');
    
    
    
    $sql = "SELECT id, name,  ( 3959 * acos( cos( radians(?) ) * cos( radians( lat ) ) 
            * cos( radians( lng ) - radians(?) ) + sin( radians(?) ) * 
            sin( radians( lat ) ) ) ) AS distance FROM markers HAVING 
            distance < 30 ORDER BY distance LIMIT 0 , 20";
  

     
    $rows = $db->fetchAll($sql, array($lat, $lng, $lat));
    
   //echo '<pre>';
   //print_r($rows);
    if ($rows[0]['distance'] > 0.25){
        echo 'You should be at least in the nearest location..<br>';
    }else{
        echo 'Start Clunking now you are in '. $rows[0]['name'];
    }
    
    foreach ($rows as $item){
        echo $item['name'].' ('. round($item['distance'],2).')<br>';
    }
    
}

if ($action == 'match'){
    
    
    //save to clunks
    $sql = "INSERT INTO clunks(lat, lon) VALUES (?, ?)";
    $res = $db->query($sql, array($lat, $lon));
      
    $sql = "SELECT t1.id, t1.bid,  ( 3959 * acos( cos( radians(?) ) * cos( radians( t1.lat ) ) 
            * cos( radians( t1.lon ) - radians(?) ) + sin( radians(?) ) * 
            sin( radians( t1.lat ) ) ) ) AS distance, t2.name
            
            FROM geodata t1 
            INNER JOIN business t2 ON t1.bid = t2.id
            
            ORDER BY distance LIMIT 0 , 20";
   // HAVING            distance < 0.25

     
    $rows = $db->fetchAll($sql, array($lat, $lon, $lat));
     
   // print_r($rows);
    
    if($rows){ 
       
        if( $rows[0]['distance'] == '' ){
            
            echo 'Sorry, we cannot determine your location';
            
        }elseif ($rows[0]['distance'] < $radius_check){

            echo 'Points added for '.$rows[0]['name'];

        }else{
             echo 'Sorry the nearest Cheers deal is at "'.$rows[0]['name'].'" which is '.$rows[0]['distance']. ' miles away. Click Find deals to know more.';
          
        }
    }else{
         echo 'Error';
    }
    
    exit;
    
}

if ($action == 'check' ){
  echo 'version 0.1';
  exit;
}

if ($action =='fblogin'){
        $facebook_access_token = getForm("facebook_access_token");
    
    	if (strlen($facebook_access_token) > 0  ) {
	
	  $graph_url = "https://graph.facebook.com/me/?access_token=".$facebook_access_token;	     
	  $fb_details = json_decode(file_get_contents($graph_url), true);
		
         
          if($fb_details){

                $facebook_uid = $fb_details['id'];
                $first_name   = $fb_details['first_name'];
                $last_name    = $fb_details['last_name'];
                $photo        = $fb_details['link'];

                //check if user already exist
                $sql = "SELECT * FROM login WHERE facebook_uid = ? LIMIT 1";
                $rows = $db->fetchRow($sql, array($facebook_uid));
                if ($rows){
                    
                  $id = $rows['id'];


                }else{
                    
                  //@TODO create user
                    $sql = "INSERT INTO login(username, facebook_uid, first_name,
                        last_name, photo) VALUES (?, ?, ? , ?, ? )";
                    $res = $db->query($sql, array($facebook_uid, $facebook_uid,
                        $first_name, $last_name, $photo));
                    $id = $db->lastInsertId();
                    
                }

 
                echo "{success:true, user_id: '". $id. "'}"; 
                exit;
           }
	}
        
    echo "{success:false, reason: 'Facebook token error' }"; 
    exit;
    
}

function logStuffs(){
    
    ob_start();
    //echo 'log';
    print_r($_REQUEST);
    $ob = ob_get_contents();
    $filename = 'log.txt';
    $handle = fopen($filename, 'a');
    fwrite($handle, $ob) ;
    fclose($handle);
    
 

}