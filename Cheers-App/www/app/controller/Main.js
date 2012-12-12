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
            bump_no:        "#bump_no",
            clunkView:      "#clunkView",
            backFromReport: "#backFromReport",
            submitReport:   "#submitReport",
            reportId:       "#reportId",
            debugUpdate:    "#debugUpdate"
             
            
             
        },
        control: {
            debugUpdate:{
              tap: "debugUpdate"  
            },
            submitReport:{
              tap: "submitReport"  
            },
            backFromReport:{
              tap: "backFromReport"  
            },
            
            clunkView: {
              painted: "clunkViewUpdate"  
            },
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
   debugUpdate: function(){
     //alert('updating debug details');
     DEBUG = Ext.getCmp("debugOn").getValue();
     DEBUG_BUMP_WITH = Ext.getCmp("debugBumpWith").getValue();
     DEBUG_LAT = Ext.getCmp("debugLat").getValue();
     DEBUG_LON = Ext.getCmp("debugLon").getValue();
     
      localStorage.setItem("DEBUG", DEBUG);
      localStorage.setItem("DEBUG_BUMP_WITH", DEBUG_BUMP_WITH);
      localStorage.setItem("DEBUG_LAT", DEBUG_LAT);
      localStorage.setItem("DEBUG_LON", DEBUG_LON);
       
      
     //alert(DEBUG +" "+ DEBUG_BUMP_WITH+ " "+DEBUG_LAT + " "+ DEBUG_LON);
     Ext.Msg.alert("Debug settings saved.")
     
   },
   submitReport: function(){
     //alert('wee'); 
     var form = this.getReportId();
     formValues = form.getValues();
     
     location_set = formValues['location_set'];
     other = formValues['other'];
     location_set = formValues['location_set'];
     location_detected = formValues['location_detected'];
     lat = formValues['lat'];
     lon = formValues['lon'];
     
     
       Ext.Ajax.request({
                            url: API_URL,
                            async : false,
                            params: {
                            id: USER_ID,
                            action: 'report',
                            location_set: location_set,
                            other: other,
                            location_detected: location_detected,                            
                            lat: lat,
                            lon: lon,
                            random: Math.random()
                            },
                            success: function(response, opts) {
                          
                            Ext.Msg.alert('Thank You','Report submitted succesfully.')
                            
                            },
                            failure: function(response, opts) {
                                 
                                 
                                 
                            }
                           
                     });
                     
     
     
     
   },
   backFromReport: function(){
        
        Ext.Viewport.animateActiveItem(this.getMainPannel(), {type:'slide', direction:'right'});
   },
   clunkViewTap: function(){
     alert(1);  
   },
   refresh_location: function(){
     alert(1);  
   },
   clunkRefresh: function(){
       
        refresh_location = Ext.getCmp("refresh_location");
       refresh_location.addCls('hidden');
       
        location_text = Ext.getCmp("location_text");
        location_text.setHtml('<div style="font-size:16px">Checking your location...</div>')
     
        points_text = Ext.getCmp("points_text");
        points_text.addCls('hidden');
        
        bgpoints = Ext.getCmp("bgpoints");
        bgpoints.addCls('hidden');
        
        pointsbar = Ext.getCmp("pointsbar");
        pointsbar.addCls('hidden');
        
        bgstatus = Ext.getCmp("bgstatus");
        bgstatus.addCls('hidden');
        
        
        statustext = Ext.getCmp("statustext");
        statustext.addCls('hidden');
        
        bgbadges = Ext.getCmp("bgbadges");
        bgbadges.addCls('hidden');
        
        badgetext = Ext.getCmp("badgetext");
        badgetext.addCls('hidden');
        
        bugreport = Ext.getCmp("bugreport");
        bugreport.addCls('hidden');
        
        LOCATION_NAME = "Unknown";
        
         setTimeout(function() {
        // do your work here
        
        navigator.geolocation.getCurrentPosition(function(position){
                             
                    lat = position.coords.latitude;
                    lon = position.coords.longitude;
                    console.log('DEBUG = '+DEBUG);
                    //alert('DEBUG == '
                    if (DEBUG){
                        
                        lat = DEBUG_LAT;
                        lon = DEBUG_LON;
                    }
                    Ext.Ajax.request({
                            url: API_URL,
                            async : false,
                            params: {
                            id: USER_ID,
                            action: 'getBp',
                            lat: lat,
                            lon: lon,
                            random: Math.random()
                            },
                            success: function(response, opts) {
                                    
                               //aupdate BP_ID
                              //alert(1);
                               //alert(response.responseText);
                               //return response.responseText;
                                console.log(response.responseText);
                            
                               
                               
                               result = Ext.decode(response.responseText);
                               console.log(result);
                               if (result.success){
                                   
                                   //update the Current BP_ID;
                                   BP_ID = result.data.bid;
                               
                                   //document.getElementById("bg_points").visibility = 'visibile';
                                   //
                                   //
                                   //do stuff here
                                   console.log(result.data.name);
                                   location_text = Ext.getCmp("location_text");
                                   console.log(location_text);
                                   location_text.setHtml(result.data.name);
                                   LOCATION_NAME = result.data.name;
                                   
                                  //  Ext.fly('bg_points').setStyle('visibility', 'visible');
                                   //bg_points.setStyle
                                   
                                  // console.log(Ext.get('bg_points'));
                                 // console.log('get visible');
                                  //document.getElementById("bg_points").style.visibility='visible';
                                  
                                  
                                  MAX_TOTAL_POINTS = result.data.max_total_points;
                                  points_remaining = result.data.max_total_points -result.data.points;
                                  
                                  
                                   points_text.setHtml(points_remaining+ ' Points towards a free <br> beer at '+ result.data.name)
                                   points_text.removeCls('hidden');
                                   
                                   pointsbar = Ext.getCmp("pointsbar");
                                   
                                   pointsbar_length = (result.data.points/result.data.max_total_points)* 220;
                                   //alert(pointsbar_length); 
                                   
                                   pointsbar.setHtml('<div style="height:25px;width:'+pointsbar_length+'px;background-color:#b25538"></div>');
                                   
                                   statustext = Ext.getCmp("statustext");
                                   
                                   //rank = 'Alpha Elite';
                                   statustext.setHtml('Your rank - '+ result.data.rank);
                                   
                                   badges = result.data.badges;
                                   var badgeresult ='';
                                   for(i = 0; i< badges.length;i++){
                                       badgeresult = badgeresult +' *'+ badges[i];
                                   }
                                   badgetext = Ext.getCmp("badgetext");
                                   badgetext.setHtml(badgeresult);
                                   
                                                                     
                                   bgpoints.removeCls('hidden');                                  
                                   pointsbar.removeCls('hidden');                                  
                                   bgstatus.removeCls('hidden');                                 
                                   statustext.removeCls('hidden');                                   
                                   bgbadges.removeCls('hidden');                                   
                                   badgetext.removeCls('hidden');
                                   bugreport.removeCls('hidden');
                                   
                               }else{
                                  // Ext.Msg.alert('You need to be in one of our Business Partners')
                                   
                                   location_text.setHtml('Unknown Place');
                                   refresh_location = Ext.getCmp("refresh_location");
                                   refresh_location.removeCls('hidden');
                                   
                                   bugreport.removeCls('hidden');
                               }
                            
                            },
                            failure: function(response, opts) {
                                 
                                 //alert('Error::Initial Check ::  ' + response.responseText);	
                                 
                                 
                            },
                            beforerequest: function(){

                            }
                     });

        }, function(){
             location_text.setHtml('<span style="font-size:15px">No internet/GPS </span>');
             refresh_location = Ext.getCmp("refresh_location");
             refresh_location.removeCls('hidden');
            //Ext.Msg.alert('Cheers API','Connection error');
            
        });
      }, 300);
       
   },
   bugReport: function(){
    if (!this.Report) this.Report = Ext.create('Cheers.view.Report');
       Ext.Viewport.animateActiveItem(this.Report, {type:'slide', direction:'left'});
   
   },
   clunkViewUpdate: function(panel){
        // alert(panel);
         clunkRefresh = this.clunkRefresh();
         
         var el = panel.element;
         console.log('painted ');
         el.on('tap', function(e,t){
             console.log('tapped');
             var span = e.getTarget('span');
             if (span){
                 console.log(span);
                 console.log('result= '+ t.id + ' '+ e);
                 if (t.id == 'refresh_id'){
                    
                    //Ext.Msg.alert('','Refreshing');
                    Cheers.app.getControllerInstances()['Cheers.controller.Main'].clunkRefresh();
                 }
                 if (t.id == 'bug_report'){
                    Cheers.app.getControllerInstances()['Cheers.controller.Main'].bugReport();
                 }
                 
                 
             }
             
             var div = e.getTarget('div');
             if (div){
                if (t.id == 'sim_match_area'){
                     Cheers.app.getControllerInstances()['Cheers.controller.Main'].setBumpStatusMatch();
                 }
             }
         }, panel);
         
       
       clunkability = Ext.getCmp("clunkability");
       clunkability.addCls('hidden');
       
       pointsbardisabled = Ext.getCmp("pointsbardisabled");
       pointsbardisabled.addCls('hidden');
        
       refresh_location = Ext.getCmp("refresh_location");
       refresh_location.addCls('hidden');
       
       refresh_location = Ext.getCmp("refresh_location");
       refresh_location.addCls('hidden');
       
        location_text = Ext.getCmp("location_text");
        location_text.setHtml('<div style="font-size:16px">Checking your location...</div>')
     
        points_text = Ext.getCmp("points_text");
        points_text.addCls('hidden');
        
        bgpoints = Ext.getCmp("bgpoints");
        bgpoints.addCls('hidden');
        
        pointsbar = Ext.getCmp("pointsbar");
        pointsbar.addCls('hidden');
        
        bgstatus = Ext.getCmp("bgstatus");
        bgstatus.addCls('hidden');
        
        
        statustext = Ext.getCmp("statustext");
        statustext.addCls('hidden');
        
        bgbadges = Ext.getCmp("bgbadges");
        bgbadges.addCls('hidden');
        
        badgetext = Ext.getCmp("badgetext");
        badgetext.addCls('hidden');
        
        bugreport = Ext.getCmp("bugreport");
        bugreport.addCls('hidden');
        
        this.clunkRefresh();
        return true;
     setTimeout(function() {
        // do your work here
        
        navigator.geolocation.getCurrentPosition(function(position){
                             
                    lat = position.coords.latitude;
                    lon = position.coords.longitude;
                    
                    if (DEBUG){
                        lat = DEBUG_LAT;
                        lon = DEBUG_LON;
                    }
                    Ext.Ajax.request({
                            url: API_URL,
                            async : false,
                            params: {
                            id: USER_ID,
                            action: 'getBp',
                            lat: lat,
                            lon: lon,
                            random: Math.random()
                            },
                            success: function(response, opts) {
                                    
                               //aupdate BP_ID
                              //alert(1);
                               //alert(response.responseText);
                               //return response.responseText;
                                console.log(response.responseText);
                            
                               
                               
                               result = Ext.decode(response.responseText);
                               console.log(result);
                               if (result.success){
                                   
                                   //update the Current BP_ID;
                                   BP_ID = result.data.bid;
                               
                                   //document.getElementById("bg_points").visibility = 'visibile';
                                   //
                                   //
                                   //do stuff here
                                   console.log(result.data.name);
                                   location_text = Ext.getCmp("location_text");
                                   console.log(location_text);
                                   location_text.setHtml(result.data.name);
                                   
                                   
                                  //  Ext.fly('bg_points').setStyle('visibility', 'visible');
                                   //bg_points.setStyle
                                   
                                  // console.log(Ext.get('bg_points'));
                                 // console.log('get visible');
                                  //document.getElementById("bg_points").style.visibility='visible';
                                  
                                  
                                  
                                  points_remaining = result.data.max_total_points -result.data.points;
                                  
                                  //alert(points_remaining);
                                   points_text.setHtml(points_remaining+ ' Points towards a free <br> beer at '+ result.data.name)
                                   points_text.removeCls('hidden');
                                   
                                   pointsbar = Ext.getCmp("pointsbar");
                                   
                                   pointsbar_length = (result.data.points/result.data.max_total_points)* 220;
                                   //alert(pointsbar_length); 
                                   
                                   pointsbar.setHtml('<div style="height:25px;width:'+pointsbar_length+'px;background-color:#b25538"></div>');
                                   
                                   statustext = Ext.getCmp("statustext");
                                   
                                   //rank = 'Alpha Elite';
                                   statustext.setHtml('Your rank - '+ result.data.rank);
                                   
                                   badges = result.data.badges;
                                   var badgeresult ='';
                                   for(i = 0; i< badges.length;i++){
                                       badgeresult = badgeresult +' *'+ badges[i];
                                   }
                                   badgetext = Ext.getCmp("badgetext");
                                   badgetext.setHtml(badgeresult);
                                   
                                                                     
                                   bgpoints.removeCls('hidden');                                  
                                   pointsbar.removeCls('hidden');                                  
                                   bgstatus.removeCls('hidden');                                 
                                   statustext.removeCls('hidden');                                   
                                   bgbadges.removeCls('hidden');                                   
                                   badgetext.removeCls('hidden');
                                   bugreport.removeCls('hidden');
                                   
                               }else{
                                  // Ext.Msg.alert('You need to be in one of our Business Partners')
                                   
                                   location_text.setHtml('Unknown Place');
                               }
                            
                            },
                            failure: function(response, opts) {
                                 
                                 //alert('Error::Initial Check ::  ' + response.responseText);	
                                 
                                 
                            },
                            beforerequest: function(){

                            }
                     });

        }, function(){
            Ext.Msg.alert('Cheers API','Connection error');
            
        });
      }, 300);

      return false;
        
     
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
                                    
                               //aupdate BP_ID
                              //alert(1);
                               //alert(response.responseText);
                               //return response.responseText;
                              console.log(response.responseText);
                            
                               result = Ext.decode(response.responseText);
                               console.log(result);
                               if (result.success){
                                   
                               }else{
                                   Ext.Msg.alert('You need to be in one of our Business Partners')
                               }
                            
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
        if (BP_ID == null ) result = this.getBPLocation();
        console.log(result);
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
        
       this.bumpStatus('BUMP-DETECTED'); 
       setTimeout(function() {
           
       
         Cheers.app.getControllerInstances()['Cheers.controller.Main'].cheersSend(DEBUG_BUMP_WITH);
       } ,400);
       
      
    },
    setBumpStatusNoMatch: function(){
       
      this.bumpStatus('NO-MATCH');  
    },
    bumpStatus: function(status){
       //handles bump status
       
      if (BUMP_LOCKED) return false;
       
      if (status == 'CONNECTED'){
          BUMP_CONNECTED = true;
         // Ext.getCmp('bumpStatusText').setHtml('<div style="color:green">Connected</div>');
        // Ext.Msg.alert('Bump', 'Connected...')
         
       
       clunkability.addCls('hidden');            
       pointsbardisabled.addCls('hidden');
       points_text.setHtml('Ready to clunk.')
         
      }
      if (status == 'DISCONNECTED'){
          BUMP_CONNECTED = false;
          //Ext.getCmp('bumpStatusText').setHtml('checking network connection');
        // alert('disconnected');
       // Ext.Msg.alert('', 'Disconnected...')
         points_text.setHtml('waiting for connection....')
       clunkability.removeCls('hidden');            
       pointsbardisabled.removeCls('hidden');
      }
      
      if (status == 'NO-MATCH'){
          
          BUMP_FAIL_COUNTER++
          if (BUMP_FAIL_COUNTER> BUMP_FAIL_MAX){
              BUMP_FAIL_COUNTER =0;
              
            //  Ext.Msg.alert('Bump', 'Please stop playing with yourself!!!')
            
             points_text.setHtml('Please stop playing with yourself!!!');
          }else{
            // Ext.Msg.alert('Bump', 'Try again...')
            
             points_text.setHtml('Try again.');
          }
          
      }
      if(status == 'BUMP-DETECTED'){
         // Ext.Msg.alert('Bump', 'Searching...')
         points_text.setHtml('Checking...');
      }
       
      
    },
    //handles match and sending data to server for geolocation checking
    cheersSend: function(data){
        BUMP_FAIL_COUNTER = 0;
        BUMP_LOCKED = true;
        
        
        navigator.geolocation.getCurrentPosition(function(position){
        lat = position.coords.latitude;
        lon = position.coords.longitude;

        if (DEBUG){
              lat = DEBUG_LAT;
              lon = DEBUG_LON;
        }                
                    Ext.Ajax.request({
                            url: API_URL,
                            async : false,
                            params: {
                            id: USER_ID,
                            action: 'match',
                            lat: lat,
                            lon: lon,
                            bump_with: data,
                            random: Math.random()
                            },
                            success: function(response, opts) {
                            BUMP_LOCKED = false;
                            
                            //console.log(response.responseText)
                             result = Ext.decode(response.responseText);
                           console.log(result); 
                             if (result.success){
                                 
                                  pointsbar_length = (result.points/MAX_TOTAL_POINTS)* 220;
                                   //alert(pointsbar_length); 
                                   //alert(pointsbar_length);
                                   pointsbar.setHtml('<div style="height:25px;width:'+pointsbar_length+'px;background-color:#b25538"></div>');
                                   
                                  
                                   
                                   // points_text = Ext.getCmp("points_text");
                                   points_remaining = MAX_TOTAL_POINTS -result.points;
                                   //console.log(points_text);
                                 //  points_text.setHtml(points_remaining+ ' Points towards a free <br> beer  ')
                                   
                                   points_text.setHtml('You gained <b>'+result.points_gain+'</b> points. You have<br> clunked with '+ result.clunk_with);
                                   
                                   
                             }else{
                                 //alert(result.reason);
                                 points_text.setHtml(result.reason);
                             }
                            
                            //Ext.Msg.alert('Location Result', response.responseText)
                            
                                var params = {
				    method: 'feed',
				    name: 'Cheers ',
				    link: 'http://www.cheers.im',
				    picture: 'http://cheers.im/app/img/cheers.png',
				    caption: 'Clunk Cheers',
				    description: 'Cheers - Clunk with friends and get a free beer!'
				  };
				//console.log(params);
                            
                            //Disabled for now
                            // FB.ui(params, function(obj) { console.log(obj);});
                            
                            
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