Ext.define("Cheers.controller.Main", {
    extend: "Ext.app.Controller",
    id: 'mainControler',
    config: {
        routes: {
            'bump/:status': 'bumpStatus'
             
        },
        refs: {
            loginButton:    "#loginButton",
            home:           "#home",
            refresh:        "#refresh",
            sim_match:      "#sim_match",
            sim_nomatch:    "#sim_nomatch",
            Clunks:         "#Clunks",
            DealsHanlderId: "#DealsHanlderId",
            backFromMap:    "#backFromMap",
            mainPannel:     "#mainPannel",
            clunkmateView:  "#clunkmateView",
            myClunksList:   "#myClunksList",
            bump_yes:       "#bump_yes",
            bump_no:        "#bump_no"
             
        },
        control: {
            backFromMap: {
                tap: "backFromMap"
            },
            
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
            },
            Clunks:{
                painted: "clunksUpdate"
            },
            DealsHanlderId:{
                painted: "DealsShow"
            },
            clunkmateView:{
                painted:"ClunkmateShow"
            },
            myClunksList:{
		itemsingletap: "myClunksListOption"
            },
            bump_yes:{
		tap: "bump_yes"
            },
            bump_no:{
		tap: "bump_no"
            }
            
             	 
        }
    },
   bump_yes: function(){
    window.bumpable('YES', function(result) {
               console.log('bumpable set to no');
              });
   },
   bump_no: function(){
       
       window.bumpable('NO', function(result) {
               console.log('bumpable set to no');
              });
       //alert(1);
   },
   myClunksListOption: function (list, record, item, e){
       alert(1);
       console.log(e);
       
   },
   backFromMap: function(){
       // alert('weee');
         //if (!this.Main) this.Main = Ext.create('Cheers.view.Main');
         //console.log(this.Main);
       // console.log(this.getMainPannel());
        //this.getMainPannel().hide();
         var myview = this.getMainPannel();
        myview.setActiveItem(0)
    
        Ext.Viewport.animateActiveItem(this.getMainPannel(), {type:'slide', direction:'right'});
    },
    getBPLocation: function(){
       //retrieves the BP_ID base on user lat lon
       alert('getting bp loc')
            navigator.geolocation.getCurrentPosition(function(position){
                             
                    Ext.Ajax.request({
                            url: API_URL,
                            async : false,
                            params: {
                            id: USER_ID,
                            action: 'getBp',
                            lat: position.coords.latitude,
                            lon: position.coords.longitude,
                            random: Math.random()
                            },
                            success: function(response, opts) {
                                    
                               //update BP_ID
                               alert(response);
                            
                            },
                            failure: function(response, opts) {
                                 
                                 alert('Error::Initial Check ::  ' + response.responseText);					
                            },
                            beforerequest: function(){

                            }
                     });

        }, function(){
            Ext.Msg.alert('Cheers API','Connection error');
            
        });
        
    },
    ClunkmateShow: function(){
        alert(BP_ID);
        if (BP_ID == null ) this.getBPLocation();
       //get points from bp
     
       
       //show the points
       
       
       //show a button for bar tender to press
       
       //wait for a success message
       
       //if success is shown bar tender gives a drink
        
       /*var Items = Ext.create('Ext.data.Store', {
                model: 'Cheers.model.Clunkmate',
                sorterns: 'name',
                 grouper: {
                    groupFn: function(record) {
                        return record.get('name')[0];
                    }
                },
                proxy: {
                        type: 'ajax',
                        url : API_URL +'?id='+USER_ID + '&action=clunkmate&rand='+ Math.random(),	
                        reader : {
                                type : 'json',
                                rootProperty: ''
                            }
                }
        });
        Items.load();
        
         console.log(Items);
        ClunkmateList =  Ext.getCmp("ClunkmateList");
	ClunkmateList.setStore(Items); */
        
     
    },
      ClunkmateApprovalShow: function(){
       // alert(1);
       
         
       var Items = Ext.create('Ext.data.Store', {
                model: 'Cheers.model.Clunkmate',
                sorterns: 'name',
                 grouper: {
                    groupFn: function(record) {
                        return record.get('name')[0];
                    }
                },
                proxy: {
                        type: 'ajax',
                        url : API_URL +'?id='+USER_ID + '&action=clunkmate_approval&rand='+ Math.random(),	
                        reader : {
                                type : 'json',
                                rootProperty: ''
                            }
                }
        });
        Items.load();
        
         
        ClunkmateList =  Ext.getCmp("ClunkmateList");
	ClunkmateList.setStore(Items); 
        
     
    },
    DealsShow: function(){
       if (!this.Deals) this.Deals = Ext.create('Cheers.view.Deals');
        Ext.Viewport.setActiveItem(this.Deals);
          //alert(1);
    },
    clunksUpdate: function(){
      console.log('updating my clunks')
       var Items = Ext.create('Ext.data.Store', {
                model: 'Cheers.model.Clunks',
                proxy: {
                        type: 'ajax',
                        url : API_URL +'?id='+USER_ID + '&action=myclunks&rand='+ Math.random(),	
                        reader : {
                                type : 'json',
                                rootProperty: ''
                            }
                }
        });
        Items.load();
        
         
        myClunksList =  Ext.getCmp("myClunksList");
	myClunksList.setStore(Items); 
        
    },
    setBumpStatusMatch: function(){
      cheersSend(2);
    },
    setBumpStatusNoMatch: function(){
       
      this.bumpStatus('NO-MATCH');  
    },
    bumpStatus: function(status){
       //handles bump status
       
      if (BUMP_LOCKED) return false;
       
      if (status == 'CONNECTED'){
          BUMP_CONNECTED = true;
          Ext.getCmp('bumpStatusText').setHtml('<div style="color:green">Connected</div>');
      }
      if (status == 'DISCONNECTED'){
          BUMP_CONNECTED = false;
          Ext.getCmp('bumpStatusText').setHtml('checking network connection');
      }
      
      if (status == 'NO-MATCH'){
          
          BUMP_FAIL_COUNTER++
          if (BUMP_FAIL_COUNTER> BUMP_FAIL_MAX){
              BUMP_FAIL_COUNTER =0;
              
              Ext.Msg.alert('Bump', 'Please stop playing with yourself!!!')
          }else{
          Ext.Msg.alert('Bump', 'Try again...')
          }
          
      }
      if(status == 'BUMP-DETECTED'){
          Ext.Msg.alert('Bump', 'Searching...')
      }
       
      
    },
    //handles match and sending data to server for geolocation checking
    cheersSend: function(data){
        BUMP_FAIL_COUNTER = 0;
        BUMP_LOCKED = true;
        
        navigator.geolocation.getCurrentPosition(function(position){
                             
                    Ext.Ajax.request({
                            url: API_URL,
                            async : false,
                            params: {
                            id: USER_ID,
                            action: 'match',
                            lat: position.coords.latitude,
                            lon: position.coords.longitude,
                            bump_with: data,
                            random: Math.random()
                            },
                            success: function(response, opts) {
                            BUMP_LOCKED = false;
                            Ext.Msg.alert('Location Result', response.responseText)
                            
                                var params = {
				    method: 'feed',
				    name: 'Cheers ',
				    link: 'http://www.cheers.im',
				    picture: 'http://cheers.im/app/img/cheers.png',
				    caption: 'Clunk Cheers',
				    description: 'Cheers - Clunk with friends and get a free beer!'
				  };
				console.log(params);
                             FB.ui(params, function(obj) { console.log(obj);});
                            
                            
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
            BUMP_LOCKED = false;
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
                             console.log('Access Token = '+ access_token);
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
                                            result=  window.bump(USER_ID, function(echoValue) {
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