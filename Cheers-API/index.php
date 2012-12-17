<?php
//logStuffs();

require_once ('db.php');
require_once ('functions.php');

$radius_check = 0.18; //in miles

$action = getForm("action");
$id     = getForm("id");
$lat    = getForm("lat");
$lon    = getForm("lon");
$bump_with = getForm("bump_with");
$lat    = getForm('lat');
$lng    = getForm('lng'); //deprecated
$bid    = getForm('bid');

$location_set = getForm("location_set");
$other = getForm("other");
$location_detected = getForm("location_detected");
$show_him   = getForm("show_him");
$show_me    = getForm("show_me");
$clunkmate  = getForm("clunkmate");


//@todo create a token for direct auth

if ($action == 'setClunkmateHim'){
    $sql = "UPDATE clunkmate SET show_him = ? WHERE user_id = ? AND  clunker_id = ?";
    $res = $db->query($sql, array($show_him, $id, $clunkmate));
    
    echo $sql;
    echo "$show_him, $id, $clunkmate";
    exit;
}

if ($action == 'getBpDetailsMore'){
    
    //get bp info
    $sql = "SELECT t1.name, t1. description, t1.description_long,
            t2.points, t3.max_total_points, 
            t3.cooldown
            FROM business t1
            LEFT JOIN user_points t2 ON t1.id = t2.bp_id and t2.user_id = ?
            LEFT JOIN bp_rules t3 ON t1.id = t3.bid
            WHERE t1.id =  ? ";
    
    $rows = $db->fetchRow($sql, array($id, $bid));
    
    
    /*
     * ,   
            t2.bp_id, t3.user_id, t3.clunker_id, t3.show_me, t3.show_him, t4.user_id as user_idt,
            t4.clunker_id as clunker_idt, t4.show_me as show_met, t4.show_him as show_himt
     */
    //get clunkmates
    $sql = "SELECT Distinct(t2.id), t1.id as friend_id, t1.first_name, 
            t1.last_name, t1.facebook_uid, t2.date
            FROM login t1
            INNER JOIN clunks t2 ON t1.id = t2.user_id AND t2.bp_id = ? AND t2.status = ?
            INNER JOIN clunkmate t3 ON t1.id = t3.user_id AND t3.clunker_id = ?
            INNER JOIN clunkmate t4 ON t4.user_id = t3.clunker_id AND t4.clunker_id = t1.id
            WHERE t1.id <> ? AND t3.show_me = ? AND t4.show_him = ?
            LIMIT 5
            ";
          //INNER JOIN clunkmate t3 ON t1.id = t3.user_id AND t3.clunker_id = ?  Get clunker_id with id = USERID
          
          //
    $clunkmates = $db->fetchAll($sql, array($bid,1, $id, $id, 1, 1));
    
   
    
    $rows['rank'] = 'Alpha Player';
    $result['success'] = true;
    $result['bp'] = $rows;
    $result['recent'] = $clunkmates;
    $result['badges'] = array('Bender','Entourage','Player');
    
     
    
    echo json_encode($result);
    //exit;
}

if ($action == 'getBpDetails'){
    
    //get bp info
    $sql = "SELECT t1.name, t1. description, t2.points, t3.max_total_points, 
            t3.cooldown
            FROM business t1
            LEFT JOIN user_points t2 ON t1.id = t2.bp_id and t2.user_id = ?
            LEFT JOIN bp_rules t3 ON t1.id = t3.bid
            WHERE t1.id =  ? ";
    
    $rows = $db->fetchRow($sql, array($id, $bid));
    
    
    print_r($rows);
    //exit;
}

if ($action == 'report'){
    $sql = "INSERT INTO report(userid, location_set, other, location_detected, 
            lat, lon) VALUES (?, ?, ?, ?, ? , ?)";
    $res = $db->query($sql, array($id, $location_set, $other, $location_detected,
            $lat, $lon ));
   
    //@TODO add a feedback result
    
    exit;
}

if ($action == 'clunkmate'){
    $sql = "SELECT t1.id as user_id, t1.facebook_uid, concat(t1.first_name,' ',  t1.last_name) as name , t1.photo
            FROM login t1 
            INNER JOIN clunkmate t2 ON t1.id = t2.clunker_id 
            WHERE t2.user_id = ? ";
    $rows = $db->fetchAll($sql, array($id));
    
    echo json_encode($rows);
    exit;
}


if ($action == 'getBp'){
    
    $sql = "SELECT t1.id, t1.bid,  ( 3959 * acos( cos( radians(?) ) * cos( radians( t1.lat ) ) 
            * cos( radians( t1.lon ) - radians(?) ) + sin( radians(?) ) * 
            sin( radians( t1.lat ) ) ) ) AS distance, t2.name, t3.points, 
            t3.last_update as last_clunked, t5.max_total_points , t5.cooldown,
            t5.first_clunk_points , t5.normal_clunk_points 
            FROM geodata t1 
            INNER JOIN business t2 ON t1.bid = t2.id
            LEFT JOIN  user_points t3 ON t1.bid = t3.bp_id AND t3.user_id = ?
            LEFT JOIN clunks t4 on t3.user_id = t4.user_id 
            LEFT JOIN bp_rules t5 ON t1.bid = t5.bid
            GROUP BY t1.bid
            
            HAVING  distance < $radius_check
            ORDER BY distance    
            LIMIT 1
            
            ";
    $rows = $db->fetchAll($sql, array($lat, $lon, $lat, $id));
    
   // print_r($rows);
    if (!$rows){
        
        $result['success'] =false;
        
        
    }else{
        
        $rows[0]['rank'] = 'Alpha Elite';
        $rows[0]['badges'] = array('Bender','Entourage','Player');
        $result['success'] = true;
        $result['data'] = $rows[0];
     }
    
    echo json_encode($result);
    exit;
}


//get business within the geo
if ($action  == 'getgeo'){
    
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

if ($action == 'deals'){
    
  $sql = "SELECT t1.id, t1.bid, t1.lat, t1.lon, round( ( 3959 * acos( cos( radians(?) ) * cos( radians( t1.lat ) ) 
            * cos( radians( t1.lon ) - radians(?) ) + sin( radians(?) ) * 
            sin( radians( t1.lat ) ) ) ),2 ) AS distance,     t2.name as bp_name, t2.photo_url
           
            FROM geodata t1 
            INNER JOIN business t2 ON t1.bid = t2.id
            HAVING     distance < 130   
            ORDER BY distance LIMIT 0 , 100";
    $rows = $db->fetchAll($sql, array($lat, $lon, $lat));
     
    echo json_encode($rows);
 
    exit;
}

if ($action == 'match'){
    
    //get name bump with
    $sql = "SELECT * FROM login WHERE id = ? ";
    $clunk_with = $db->fetchRow($sql, array($bump_with));
    
    //save to clunks
    $sql = "INSERT INTO clunks(user_id, bump_with, lat, lon) VALUES (?, ?,
            ?, ?)";
    $res = $db->query($sql, array($id, $bump_with, $lat, $lon));
    
    $clunk_id = $db->lastInsertId();
      
    $sql = "SELECT t1.id, t1.bid,  ( 3959 * acos( cos( radians(?) ) * cos( radians( t1.lat ) ) 
            * cos( radians( t1.lon ) - radians(?) ) + sin( radians(?) ) * 
            sin( radians( t1.lat ) ) ) ) AS distance, t2.name, t3.points, 
            t3.last_update as last_clunked, t5.max_total_points , t5.cooldown,
            t5.first_clunk_points , t5.normal_clunk_points 
            FROM geodata t1 
            INNER JOIN business t2 ON t1.bid = t2.id
            LEFT JOIN  user_points t3 ON t1.bid = t3.bp_id AND t3.user_id = ?
            LEFT JOIN clunks t4 on t3.user_id = t4.user_id 
            LEFT JOIN bp_rules t5 ON t1.bid = t5.bid
            GROUP BY t1.bid
            ORDER BY distance LIMIT 0 , 2
            ";
   // HAVING            distance < 0.25

     
    $rows = $db->fetchAll($sql, array($lat, $lon, $lat, $id));
   
   // echo '<pre>';
    // print_r($rows);
    
    if($rows){ 
       
        $result['clunk_with'] = $clunk_with['first_name']. ' '. $clunk_with['last_name'];
        $result['bid'] = $rows[0]['bid'];
         
        if( !is_numeric($rows[0]['distance']) ){
            // echo 'You have clunked with '.$clunk_with['first_name']. ' '. $clunk_with['last_name']. ' <br>';
            $rows['success'] = false;
            $rows['reason']  = 'Sorry, we cannot determine your location';
            
            
            
        }elseif ($rows[0]['distance'] < $radius_check){
           
            $add_points = true;
            $no_points_reason = ''; 
            $points_to_add = $rows[0]['normal_clunk_points'];
            
            
            
            //print_r($rules);
            
            $hour_last_clunked = (strtotime(date("Y-m-d H:i:s")) - strtotime($rows[0]['last_clunked']))/3600;
          //  echo 'last hour clunked = '.$hour_last_clunked;
            
            if ($rows[0]['cooldown'] > $hour_last_clunked) {
                $rows['success'] = false;
                $add_points = false;
                $no_points_reason = 'Need to wait '.( round($rows[0]['cooldown'] - $hour_last_clunked,0)) . ' hour(s) until you can clunked again!';
                $rows['reason'] = $no_points_reason; 
                
            }
            
            if ($rows[0]['last_clunked'] == '') {
                 $points_to_add = $rows[0]['first_clunk_points'];
            }
            
             if ($rows[0]['points'] >=  $rows[0]['max_total_points']) {
                 $add_points = false;
                 $rows['success'] = false;
                 $no_points_reason = 'You have reached the maximum points, redeem it now for a free drink! ';
                 $rows['reason'] = $no_points_reason; 
            }
            
            
            
            // echo 'You have clunked with '.$clunk_with['first_name']. ' '. $clunk_with['last_name']. ' <br>';
             
             
             if (!$add_points){
                 // echo 'Sorry no points added for '.$rows[0]['name']. '<br> Your Points still the same : '.( intval($rows[0]['points'])   );
                 // echo  '<br>'.$no_points_reason;
                  
                   $result['success'] = false;
                   $result['reason'] = $no_points_reason;
             }else{
             
             // echo 'Points added for '.$rows[0]['name']. '<br> Your Points now : '.( intval($rows[0]['points']) + $points_to_add  );
             // echo ' You gained '. $points_to_add;
              
              $result['success'] = true;
              $result['points_gain'] = $points_to_add;
              
              $result['points'] = intval($rows[0]['points']) + $points_to_add;
              $result['bid'] = $rows[0]['bid'];
               
                //add points here
                $sql ="INSERT INTO user_points (bp_id, user_id , points) VALUES (? , ? , ?)
                        ON DUPLICATE KEY UPDATE points = points + ?";
                $res = $db->query($sql, array($rows[0]['bid'], $id, $points_to_add, $points_to_add));
                
                //update clunk bp id
                $sql = "UPDATE  clunks SET status = ?, bp_id = ?  WHERE id = ? ";
                $res = $db->query($sql, array(1, $rows[0]['bid'], $clunk_id));
             }

        }else{
            // echo 'You have clunked with '.$clunk_with['first_name']. ' '. $clunk_with['last_name']. ' <br>';
              
             $result['success'] = false;
             $result['reason'] = 'Sorry the nearest Cheers deal is at "'.$rows[0]['name'].'" which is '.$rows[0]['distance']. ' miles away. Click Find deals to know more.';
        }
    }else{
         $result['success'] = false;
         $result['reason'] = 'Error';
    }
    
    echo json_encode($result);
    exit;
    
}

if ($action == 'check' ){
  echo 'version 0.3';
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
                if($fb_details['photo_url']){
                $photo        = $fb_details['photo_url'];
                }else{
                 $photo  = '';
                }

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

if ($action == 'myclunks'){
    
    $sql = "SELECT count(t1.id) as total , t1.bump_with, t2.facebook_uid,
            t2.first_name, t2.last_name, MAX(t1.date) as last_clunked, t3.show_me,
            t3.show_him
            FROM clunks t1 
            INNER JOIN login t2 on t1.bump_with = t2.id
            LEFT JOIN clunkmate t3 ON t1.bump_with = t3.clunker_id AND t3.user_id = ?
            WHERE t1.user_id = ?
            GROUP by t1.bump_with
            ORDER BY last_clunked DESC";
     $rows = $db->fetchAll($sql, array($id, $id));
     //print_r($rows);
     
     
     echo json_encode($rows);
     exit;
     echo "[{user_id:4, photo_url:'http://graph.facebook.com/100000895460798/picture', total: '5', last_clunked:'November 14' },{user_id:4, photo_url:'http://www.facebook.com/profile.php?id=100000895460798', total: '5', last_clunked:'November 14' }]"; 
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