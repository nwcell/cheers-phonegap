Ext.application({
     requires: [
    // 'Cheers.view.override.Map'
    ],
    name: 'Cheers',
    views: ['Main','Clunks','DealsHandler','Clunk','Map','BusinessPartner','Redeem','ClunkmateDetail'],
    //'Deals','Map'
    controllers: ['Main'],
    models: ['Clunks','Deal','ClunkHistory'],
    stores: ['Clunks','Deals','Clunkmate'],
 

    launch: function() {
         
     
      
          
        
        if ( Ext.browser.is.Chrome) {
            //debug mode
             USER_ID = 5;
             if (!this.Main) this.Main = Ext.create('Cheers.view.Main');
             Ext.Viewport.add([ this.Main]);
             DEBUG = true;
             LAT = 61.198002;
             LON = -149.878998;
            
        }else{
            
        
        FB.getLoginStatus(function(response) {
            
           
            if (response.status == 'connected' && USER_ID != null) {
             
             
              result=  window.bump(USER_ID, function(result) {
                    console.log('bump init');
                        window.bumpable('NO', function(result) {
                        console.log('bumpable set to no');
                    });
              });
              
             
        
              if (!this.Main) this.Main = Ext.create('Cheers.view.Main');
              
               Ext.Viewport.add([ this.Main]);
              
            } else {
               
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
