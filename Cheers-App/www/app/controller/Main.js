Ext.define("Cheers.controller.Main", {
    extend: "Ext.app.Controller",
    id: 'mainControler',
    config: {
        routes: {
            'bump/:status': 'bumpStatus'
             
        },
        refs: {
            loginButton:  "#loginButton",
            home: '#home',
            refresh: "#refresh",
            sim_match: "#sim_match",
            sim_nomatch: "#sim_nomatch"
             
        },
        control: {
            
            loginButton: {
		 tap: "loginFacebook"
	    },
            refresh:{
                tap: "refresh"
            },
            sim_match:{
                tap: "setBumpStatusMatch"
            },
            sim_nomatch:{
                tap: "setBumpStatusNoMatch"
            }
            
             	 
        }
    },
    setBumpStatusMatch: function(){
      this.bumpStatus('MATCH');  
    },
    setBumpStatusNoMatch: function(){
       
      this.bumpStatus('NO-MATCH');  
    },
    bumpStatus: function(status){
       //  alert(status);
      // if (BUMP_LOCKED) return false;
      //Ext.msg.alert('Bump', status);  
      //alert(status);  
      if (status == 'CONNECTED'){
          BUMP_CONNECTED = true;
          Ext.getCmp('bumpStatusText').setHtml('<div style="color:green">Connected</div>');
      }
       if (status == 'DISCONNECTED'){
          BUMP_CONNECTED = false;
          Ext.getCmp('bumpStatusText').setHtml('checking network connection');
      }
      
      if (status == 'NO-MATCH'){
          Ext.Msg.alert('Bump', 'Try again...')
      }
      if (status == 'MATCH'){
          
          //lock bump
          //BUMP_LOCKED = true;
          
          //send users info to cheers api
          this.cheersSend()
          
          
      }
      
    },
    cheersSend: function(){
        navigator.geolocation.getCurrentPosition(function(position){
              //alert('lat ='+position.coords.latitude + ' lon='+ position.coords.longitude);
               
                    Ext.Ajax.request({
                            url: API_URL,
                            async : false,
                            params: {
                            id: USER_ID,
                            action: 'match',
                            lat: position.coords.latitude,
                            lon: position.coords.longitude,
                            random: Math.random()
                            },
                            success: function(response, opts) {
                            BUMP_LOCKED = false;
                            Ext.Msg.alert('Location Result', response.responseText)
                            
                            },
                            failure: function(response, opts) {
                                 BUMP_LOCKED = false;
                                alert('Error::Initial Check ::  ' + response.responseText);					
                            },
                            beforerequest: function(){

                            }
                     });

        }, function(){
            Ext.Msg.alert('Cheers API','Connection error');
        });  
        
    },
    test1: function(){
      alert(1);  
    },
    sendGeo: function(position){
      

      
    },
    refresh: function(){
       navigator.geolocation.getCurrentPosition(this.sendGeo, this.geoError);  
    },
    cheersAuth: function(access_token){
           
       
            
    },
    loginFacebook: function(){
        
                  FB.login(
                         function(response) {
                        // console.log(response);
                           
                        if (response.status) {
                            var access_token =   FB.getAuthResponse()['accessToken'];
                           // console.log('Access Token = '+ access_token);
                               //alert(access_token);
                              
                                Ext.Ajax.request({
                                        url: API_URL,
                                        async : false,
                                        params: {
                                        facebook_access_token: access_token,
                                        action: 'fblogin'
                                        },
                                        success: function(response, opts) {
                                  
                                        console.log('Got response from Cheers API '+ response.responseText)
                                        try {
                                        
                                            
                                           var checkResult = Ext.decode(response.responseText);                                       
                                           if (checkResult.success == true ){
                                               result = true;
                                            
                                             USER_ID = checkResult.user_id; 
                                             window.localStorage.setItem("USER_ID", USER_ID);
                                             
                                            //Bump Init here
                                            result=  window.bump("INIT", function(result) {
                                             console.log('bump init');
                                            });
                                            
                                            
                                           
                                           
                                            
                                            // send to main page
                                             if (!this.Main) this.Main = Ext.create('Cheers.view.Main');
                                          
                                              //get initial location
                                            //  this.updateLocation();
                                          
                                           Ext.Viewport.animateActiveItem(this.Main,  { type: 'fade'});
                            
                                            }else{
                                           
                                                alert('Error::Initial Check ::  ' + checkResult.errors.reason);
                                            }
                                        }catch (err) {
                                            alert("Error::Initial Check "+err );
                                            Ext.Viewport.setMasked(false);							 
                                        }
                                        },
                                        failure: function(response, opts) {
                                            Ext.Viewport.setMasked(false);
                                            alert('Error::Initial Check ::  ' + response.responseText);					
                                        },
                                        beforerequest: function(){
                                             
                                        }
                                 });
                                 
                                        
                         } else {
                        
                           Ext.Msg.alert('Facebook','Unable to get permission');
                         }
                         },
                         { scope: "email" }
                         );
                             
                        
       
    },

    updateLocation: function(){
        alert('update location');
        
    },
	  
    launch: function () {
    },
    init: function() {
    }
});