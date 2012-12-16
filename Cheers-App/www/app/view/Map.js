
Ext.define('Cheers.view.Map', {
    extend: 'Ext.Map',
    xtype: 'DealsMap',
   

    config: {
     title:'Find Deals',
             iconCls: 'search',
             scrollable:true,
             layout: 'fit',    
		//useCurrentLocation: true,
        listeners: [
            {
                fn: 'onMapMaprender',
                event: 'maprender'
            }
        ]
    },

    onMapMaprender: function(map, gmap, options) {
	
    //return false;
        //var store = Ext.getStore('Deals');
        //var count = store.getCount();
        //debugger;
        
       lat = LAT;
       lon = LON;
       if (DEBUG){
           // alert('debug')
                lat = DEBUG_LAT;
               lon = DEBUG_LON;
         }
     

       var store = Ext.create('Ext.data.Store', {
           model: 'Cheers.model.Deal',
           proxy: {
                   type: 'ajax',
                   url :API_URL +'?id='+ USER_ID + '&lat='+ lat +'&lon='+ lon + '&action=deals&rand='+ Math.random(),	
                   reader : {
                                     type : 'json',
                                     rootProperty: ''
                           }
           }
           });
          // alert('store loaded');
          store.load({
       scope: this,
       callback: function(records) {
           //debugger;
                           //console.log(records);
                           //alert('shit');
           this.processMap(records);
           }
       });
		
        
        /*
        var neighborhoods = [
        new google.maps.LatLng(52.511467, 13.447179),
        new google.maps.LatLng(52.549061, 13.422975),
        new google.maps.LatLng(52.497622, 13.396110),
        new google.maps.LatLng(52.517683, 13.394393)
        ];


        for (var i = 0; i < neighborhoods.length; i++) {
        var m = neighborhoods[i];

        new google.maps.Marker({
        position: m,
        map: gmap,
        draggable: false,
        animation: google.maps.Animation.DROP
        });
        }*/
    },

    processMap: function(bp) {
	//alert('test');	 
        console.log("hay "+bp.length+" elementos");
        for (var i = 0, ln = bp.length; i < ln; i++) {
            var bpItem = bp[i].data;
            console.log('bp item=');
            console.log(bpItem);
			//alert(tweet.geo.coordinates);
            //if (tweet.geo && tweet.geo.coordinates) {
                this.addMarker(bpItem);
                //Ext.Msg.alert("","coors "+i);
           // }
        }
    },

    addMarker: function(bp) {


 	console.log('weeee='+bp.lat);
        var infoWindow = new google.maps.InfoWindow(),
        point = new google.maps.LatLng(
        bp.lat,
        bp.lon
        ),
        marker = new google.maps.Marker({
            map: this.getMap(),
            position: point
        });

        google.maps.event.addListener(marker, "click", function() {
            infoWindow.setContent(bp.bp_name);
          ////  infoWindow.open(this.getMap(), marker);
            //alert(bp.bid);
           // Ext.Msg.alert('',bp.bid);
            
           // if (!this.BusinessPartner) this.BusinessPartner = Ext.create('Cheers.view.BusinessPartner');
            
           // console.log('this main==>'+ this.Main);
            // Ext.Viewport.add( this.BusinessPartner);
            
            

            //get details from server
          /*  Ext.Viewport.setMasked({
			xtype: 'loadmask',
			message: 'Loading...'
		});
            *
            */
        
       
        
      // if (!this.BusinessPartner) this.BusinessPartner = Ext.create('Cheers.view.BusinessPartner');
      // Ext.Viewport.animateActiveItem(this.BusinessPartner, {type:'flip'}); 
          Cheers.app.getControllerInstances()['Cheers.controller.Main'].showBusiness(bp.bid) 
       return true;
       
       Ext.Ajax.request({
                            url: API_URL,
                            async : false,
                            params: {
                            id: USER_ID,    
                            bid: bp.bid,
                            action: 'getBpDetailsMore',
                            
                            random: Math.random()
                            },
                            success: function(response, opts) {
                            
                            Ext.Msg.alert("",response.responseText);
                            Ext.Viewport.setMasked(false);
                            },
                            failure: function(response, opts) {
                                 
                                  
                            Ext.Viewport.setMasked(false);     
                                 
                            },
                            beforerequest: function(){

                            }
});
      
      
       
         
      
         
       return false;         
              Ext.Ajax.request({
                            url: API_URL,
                            async : false,
                            params: {
                            id: USER_ID,    
                            bid: bp.bid,
                            action: 'getBpDetails',
                            
                            random: Math.random()
                            },
                            success: function(response, opts) {
                            
                            Ext.Msg.alert("",response.responseText);
                            Ext.Viewport.setMasked(false);
                            },
                            failure: function(response, opts) {
                                 
                                  
                            Ext.Viewport.setMasked(false);     
                                 
                            },
                            beforerequest: function(){

                            }
                     });
                     
                     
                     
           /*  Small box
            *  
            *  overlay = Ext.Viewport.add({
            xtype: 'panel',
            centered:true,
            modal: true,
            hideOnMaskTap: true,
            hidden: true,       
            width:   260  ,
            height:   '70%'  ,

            styleHtmlContent: true,
            scrollable: true,

            // Insert a title docked at the top with a title
            items: [
                {
                     html: 'Tap Root<br>20 Character Description<br>\n\
                            You have 34 Points<br>\n\
                            Recent Clunkmates<br>\n\
                            [][][][]',
                     listeners:[{
                         element: 'element',
                         delegate: 'div.close',
                         event: 'tap',
                         fn: function(){
                             alert('close');
                         }
                     }]
                } 
            ]
        });*/

            
            
            
           overlay.show();
            
            
            
        });
    }

});