<?php

function inc_path_add($path) 
{
	if (!defined('VC_IS_WINDOWS')) {
    if (defined('PHP_OS') && eregi('win', PHP_OS)) {
        define('VC_IS_WINDOWS', 1);
    } else {
        define('VC_IS_WINDOWS', 0);
    }
	}
	

	ini_set('include_path', ini_get('include_path') . ((VC_IS_WINDOWS==1)?';':':') . $path);
}


//*************************************************************************
//retrives values from form and remove slahes if auto magic quote is on
//*************************************************************************
function getForm($name)
{
  $value = @$_REQUEST[$name];
  
  if (get_magic_quotes_gpc()) 
    {
    $value = stripslashes($value);
	}
 return $value;
}



function string_cat($string, $num){
	
	if ( strlen($string) >  $num ){
		$string = substr($string, 0, $num)."...";
	}
	return $string;
}

function getPage($id){
	global $db;
	$sql ="SELECT * FROM content WHERE id = ? ";
	$rows = $db->fetchRow($sql, array($id));
	return $rows;
}



function resize($imagePath,$opts=null){

	# start configuration
	
	$cacheFolder = '/eppm/cache/'; # path to your cache folder, must be writeable by web server
	$remoteFolder = $cacheFolder.'remote/'; # path to the folder you wish to download remote images into
	$quality = 90; # image quality to use for ImageMagick (0 - 100)
	
	$cache_http_minutes = 20; 	# cache downloaded http images 20 minutes

	$path_to_convert = 'convert'; # this could be something like /usr/bin/convert or /opt/local/share/bin/convert
	
	## you shouldn't need to configure anything else beyond this point

	# check for remote image..
	if(ereg('http://',$imagePath) == true):
		# grab the image, and cache it so we have something to work with..
		$finfo = pathinfo($imagePath);
		list($filename) = explode('?',$finfo['basename']);
		$local_filepath = $remoteFolder.$filename;
		$download_image = true;
		if(file_exists($local_filepath)):
			if(filemtime($local_filepath) < strtotime('+'.$cache_http_minutes.' minutes')):
				$download_image = false;
			endif;
		endif;
		if($download_image == true):
			$img = file_get_contents($imagePath);
			file_put_contents($local_filepath,$img);
		endif;
		$imagePath = $local_filepath;
	endif;

	if(file_exists($imagePath) == false){
		$imagePath = $_SERVER['DOCUMENT_ROOT'].$imagePath;
		if(file_exists($imagePath) == false){
			return 'image not found';
		}
	}

	if(isset($opts['w'])){ $w = $opts['w']; }
	if(isset($opts['h'])){ $h = $opts['h']; }

	$fileParts = explode('.',$imagePath);
	$count = count($fileParts) - 1;
	$ext = $fileParts[$count];

	$imgPath = str_replace('.'.$ext,'',$imagePath);

	$filename = md5_file($imagePath);

	
	if(!empty($w) and !empty($h)){
		$newPath = $cacheFolder.$filename.'_w'.$w.'_h'.$h.(isset($opts['crop']) && $opts['crop'] == true ? "_cp" : "").(isset($opts['scale']) && $opts['scale'] == true ? "_sc" : "").'.'.$ext;
	}elseif(!empty($w)){
		$newPath = $cacheFolder.$filename.'_w'.$w.'.'.$ext;	
	}elseif(!empty($h)){
		$newPath = $cacheFolder.$filename.'_h'.$h.'.'.$ext;
	}else{
		return false;
	}

	$create = true;

	if(file_exists($newPath) == true){

		$create = false;

		$origFileTime = date("YmdHis",filemtime($imagePath));
		$newFileTime = date("YmdHis",filemtime($newPath));

		if($newFileTime < $origFileTime){
			$create = true;
		}

	}

	if($create == true){
		if(!empty($w) and !empty($h)){

			list($width,$height) = getimagesize($imagePath);
		
			$resize = $w;
		
			if($width > $height){
				$resize = $w;
				if(isset($opts['crop']) && $opts['crop'] == true){
					$resize = "x".$h;				
				}
			}else{
				$resize = "x".$h;
				if(isset($opts['crop']) && $opts['crop'] == true){
					$resize = $w;
				}
			}

			if(isset($opts['scale']) && $opts['scale'] == true){
				exec($path_to_convert." ".$imagePath."  -resize ".$resize." -quality ".$quality." ".$newPath);				
			}else{
				exec($path_to_convert." ".$imagePath."  -resize ".$resize." -size ".$w."x".$h." xc:".(isset($opts['canvas-color'])?$opts['canvas-color']:"transparent")." +swap -gravity center -composite -quality ".$quality." ".$newPath);
			}
						
		}elseif(!empty($w)){
			exec($path_to_convert." ".$imagePath." -thumbnail ".$w."".(isset($opts['maxOnly']) && $opts['maxOnly'] == true ? "\>" : "")." -quality ".$quality." ".$newPath);
		}elseif(!empty($h)){
			exec($path_to_convert." ".$imagePath." -thumbnail x".$h."".(isset($opts['maxOnly']) && $opts['maxOnly'] == true ? "\>" : "")." -quality ".$quality." ".$newPath);
		}
	}
	
	# return cache file path
	return str_replace($_SERVER['DOCUMENT_ROOT'],'',$newPath);
	
}



  function getLinks($html)
    {
        /*** return array ***/
        $ret = array();

        /*** a new dom object ***/
        $dom = new domDocument;

        /*** get the HTML (suppress errors) ***/
        @$dom->loadHTML($html);

        /*** remove silly white space ***/
        $dom->preserveWhiteSpace = false;

        /*** get the links from the HTML ***/
        $links = $dom->getElementsByTagName('a');
    
        /*** loop over the links ***/
        foreach ($links as $tag)
        {
            $ret[$tag->getAttribute('href')] = $tag->childNodes->item(0)->nodeValue;
        }

        return $ret;
    }
    
    
function getAlias($text,  $table, $field){
	global $db;
	
	$alias = preg_replace('/[^a-zA-Z0-9]+/', '-', strtolower(trim($text)));
	
	$alias_unique = false;
	$alias_append = '';
	$count = 0;
	while ($alias_unique == false){
		  
		  $sql = "SELECT count(".$field.") as total  FROM ".$table." WHERE ".$field." = ? ";
		  $total = $db->fetchOne($sql, array($alias.$alias_append));
		  if ($total == 0 ){
			  $alias_unique = true;
			  $alias .= $alias_append;
		  }else{
			  $count++;
			  $alias_append = '-'.$count;
		  }
	  }
	  
	return $alias;
}    
    
//******************************************************************
//Class User
//******************************************************************
class User {
	
	var $db;
	var $id;
	
	function user()
	{
		global $db;
		
		$this->db = $db;
		
	}
	
	/*
	try to login the user
	*/
	function login($username, $password){
		
		$sql = "SELECT * FROM user WHERE email = ? ";
		$rows = $this->db->fetchRow($sql, array($username));
		
		if ( $rows ){
			
			if ( $rows['password'] == md5($password) ){
				
				//session 
				session_start();
				
				$_SESSION['logged'] = true;
				$_SESSION['userid'] = $rows['id'];
				$_SESSION['email']  = $rows['email'];
				$_SESSION['last_login'] = $rows['last_login'];
				$this->id = $rows['id'];
				$this->logged = true;
				
				//update last login
				$this->setLastLogin(date("Y-m-d H:i:s"));
				
				return true;
				
			}else{
				
				//invalid password
				return false;
			}
		
		}else{
			//user doesnt exist
			return false;
		}
	}
	
	function setLastLogin($date_time){
		$sql = "UPDATE  user SET last_login = ? WHERE id = ?";
		$res = $this->db->query($sql, array($date_time, $this->id));
		
		return $res;
	}
	
	
}    
    

//*********************************************************************
//Check if str1 and str2 matches and return "selected" if they do
//*********************************************************************
function checkMatch($str1,$str2){
	if (strtolower(trim($str1)) == strtolower(trim($str2))){
		$checkMatch = " selected ";
	}else{
		$checkMatch = "";
	}
	return $checkMatch;
}
