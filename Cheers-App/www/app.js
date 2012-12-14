Ext.application({
     requires: [
        'Cheers.view.override.Map'
    ],
    name: 'Cheers',
    views: ['Main','Clunks','DealsHandler','Clunk','Map'],
    //'Deals','Map'
    controllers: ['Main'],
    models: ['Clunks','Deal'],
    stores: ['Clunks','Deals','Clunkmate'],
 

    launch: function() {
         
       /*TODO
        *Check for Iphone resolution
        *
        *if( window.devicePixelRatio >= 2 ){
        alert( "Hi Res @ Pixel Ratio : " + window.devicePixelRatio + " &amp; Size : " + screen.width * window.devicePixelRatio);
       }else{
        alert( "Normal @ Pixel Ratio 1 &amp; Size : " + screen.width + "+" + screen.width);
       }*/
      
         
        
        if ( Ext.browser.is.Chrome) {
        //debug mode
         USER_ID = 5;
            
            if (!this.Main) this.Main = Ext.create('Cheers.view.Main');
            
            console.log('this main==>'+ this.Main);
             Ext.Viewport.add([ this.Main]);
             DEBUG = true;
             LAT = 61.198002;
             LON = -149.878998;
            
        }else{
            
            //get initial LAT /LON
         navigator.geolocation.getCurrentPosition(function(position){
               LAT = position.coords.latitude;
               LON = position.coords.longitude;
        }, function(){
            
       
          
            
        });
         
        
        FB.getLoginStatus(function(response) {
            
           
            if (response.status == 'connected' && USER_ID != null) {
             
              //Bump Init here
             
              result=  window.bump(USER_ID, function(result) {
               console.log('bump init');
              });
              
            
        
              if (!this.Main) this.Main = Ext.create('Cheers.view.Main');
              
               Ext.Viewport.add([ this.Main]);
              
            } else {
              //alert('not logged in');
              if (!this.Login) this.Login = Ext.create('Cheers.view.Login');
              Ext.Viewport.add([ this.Login]);
            }
            });
        }  
    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
