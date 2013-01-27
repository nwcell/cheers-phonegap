
Ext.define('Cheers.view.Map', {
    extend: 'Ext.Map',
    xtype: 'DealsMap',
   

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
	
        alert('rendered');
        
       var lat = LAT;
       var lon = LON;
       if (DEBUG){
      
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
          
       store.load({
       scope: this,
       callback: function(records) {
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