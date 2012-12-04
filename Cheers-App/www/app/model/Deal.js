 

Ext.define('Cheers.model.Deal', {
    extend: 'Ext.data.Model',
 
    config: {
        fields: [
            {
                name: 'id'
            },
            {
                name: 'bid'
            },
            {
                name: 'lat'
            },
            {
                name: 'lon'
            },
            {
                name: 'distance'
            }
            ,
            {
                name: 'bp_name'
            },
            {
                name: 'photo_url'
            }
            
        ]
    }
});