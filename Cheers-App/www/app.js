Ext.application({
    name: 'Cheers',
    views: ['Main'],
    controllers: ['Main'],

 

    launch: function() {
        
        // Initialize the main view
         
         
        
        FB.getLoginStatus(function(response) {
            
       
            if (response.status == 'connected' && USER_ID != null) {
             
              //Bump Init here
             
              result=  window.bump("echome", function(echoValue) {
               console.log('bump init');
              });
              
            
        
              if (!this.Main) this.Main = Ext.create('Cheers.view.Main');
              
             // Ext.Application.getControllerInstances()['Cheers.controller.Main'].updateLocation();
             // this.getApplication().getController('Main').updateLocation();  

              Ext.Viewport.add([ this.Main]);
              
            } else {
              //alert('not logged in');
              if (!this.Login) this.Login = Ext.create('Cheers.view.Login');
              Ext.Viewport.add([ this.Login]);
            }
            });
                
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
