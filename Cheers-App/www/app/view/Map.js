
Ext.define('Cheers.view.Map', {
    extend: 'Ext.Map',
    xtype: 'DealsMap',
    id: 'DealsMap',

    config: {
     title:'Find Deals',
             iconCls: 'search',
             scrollable:true,
             layout: 'fit',    
	     useCurrentLocation: true,
        listeners: [
            {
                fn: 'onMapMaprender',
                event: 'maprender'
            },
            {
                fn: 'onMapMaprender',
                event: 'centerchange'
            }
        ]
    },
    test: function(){
      alert('updated');  
    },

    onMapMaprender: function(map, gmap, options) {
	
       
       lat = map._geo._latitude;
       lon = map._geo._longitude;
       
       
       if (DEBUG == 1 || DEBUG == true){
          
          lat = DEBUG_LAT;
          lon = DEBUG_LON;
       }
     

        console.log('lat ='+lat + ' lon ='+lon);
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
       
       processMap = this.processMap;
       
       store.load({
       scope: this,
       callback: function(records) {
           console.log('processing data...');
           this.processMap(records);
           }
       });
		
 
    },

    processMap: function(bp) {
	
        console.log('total bp='+bp.length)
        for (var i = 0, ln = bp.length; i < ln; i++) {
            var bpItem = bp[i].data;
            this.addMarker(bpItem);
        
        }
    },

    addMarker: function(bp) {

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
          
       Cheers.app.getControllerInstances()['Cheers.controller.Main'].showBusiness(bp.bid) 
       return true;
       
     
            
        });
    }
    
    

});