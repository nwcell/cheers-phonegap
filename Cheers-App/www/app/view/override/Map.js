Ext.define('Cheers.view.override.Map', {
    requires: 'Cheers.view.Map'
}, function() {
    Ext.override(Cheers.view.Map, {
         config: {
            mapOptions: {
                 center: new google.maps.LatLng(61.216732,-149.879593),
                  zoom: 13
            }
        }
    });
});