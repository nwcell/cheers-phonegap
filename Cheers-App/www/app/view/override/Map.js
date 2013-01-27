Ext.define('Cheers.view.override.Map', {
    requires: 'Cheers.view.Map'
}, function() {
    
     navigator.geolocation.getCurrentPosition(function(position){
               LAT = position.coords.latitude;
               LON = position.coords.longitude;
               
               alert(LAT+ ' '+LON);
              Ext.override(Cheers.view.Map, {
              config: {
              mapOptions: {
              center: new google.maps.LatLng(LAT,LON),
                  zoom: 13
             }
        }
    });
        }, function(){
            
       
          
            
        });


   
});