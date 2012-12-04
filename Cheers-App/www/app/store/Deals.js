Ext.define('Cheers.store.Deals', {
    extend: 'Ext.data.Store',
  
    requires: [
        'Cheers.model.Deal'
    ],

    config: {
        autoLoad: false,
        model: 'Cheers.model.Deal',
        storeId: 'Deals',
        proxy: {
            type: 'ajax',             
            url: API_URL +'?id='+ USER_ID + '&lat='+ LAT +'&lon='+ LON + '&action=deals&rand='+ Math.random(),
            reader: {
                type: 'json',
                rootProperty: 'results'
            }
        }
    }
});