var API_URL     = 'http://cheers.phpwebbies.com';
var USER_ID     = window.localStorage.getItem("USER_ID");
var BUMP_STATUS = '';
var BUMP_LOCKED =    false;
var BUMP_CONNECTED = false;
var LAT;
var LON;

document.addEventListener('deviceready', function() {
   try {

    FB.init({ appId: "216450108488349", nativeInterface: CDV.FB, useCachedDialogs: false });
    
   } catch (e) {
   alert(e);
   }
}, false);


if ((typeof cordova == 'undefined') && (typeof Cordova == 'undefined')) alert('Cordova variable does not exist. Check that you have included cordova.js correctly');
if (typeof CDV == 'undefined') alert('CDV variable does not exist. Check that you have included cdv-plugin-fb-connect.js correctly');
if (typeof FB == 'undefined') alert('FB variable does not exist. Check that you have included the Facebook JS SDK file.');

    
window.bump = function(str, callback) {
    cordova.exec(callback, function(err) {
                 callback('');
                 }, "Bump", "bump", [str]);
}; 
     

function updateContent( data ) {

   Cheers.app.getControllerInstances()['Cheers.controller.Main'].bumpStatus(data);

}

function cheersSend(data){

    //prevents from doing another match
    if (BUMP_LOCKED) return false;

    //fix for my android id, don't want to update my android binary this time
    if (data == 'Bump User') data = 4;
    
    if (data == 'INIT' || !is_numeric(data)) return false;
    
    

    Cheers.app.getControllerInstances()['Cheers.controller.Main'].cheersSend(data);
}

   
    
