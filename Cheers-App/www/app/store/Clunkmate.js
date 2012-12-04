Ext.define('Cheers.store.Clunkmate', { 
  extend: 'Ext.data.Store',
  requires: ['Cheers.model.Clunkmate'],
  config: {
    model: 'Cheers.model.Clunkmate',
    autoLoad: true,
    pageSize: 5,
    autoLoad: true,

    storeId: 'Clunkmate',
	proxy: {
                type: 'ajax',
                url: API_URL +'?id='+ USER_ID + '&action=clunkmate&rand='+ Math.random(),

                pageParam: 'page',
                limitParam: 'rpp',

                extraParams: {
                        auth_key: '@TODO'
                },

                reader: {
                        type: 'json',
                        rootProperty: 'results'
                }
             }
    
  }
});