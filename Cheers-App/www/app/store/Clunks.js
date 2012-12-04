Ext.define('Cheers.store.Clunks', { 
  extend: 'Ext.data.Store',
  requires: ['Cheers.model.Clunks'],
  config: {
    model: 'Cheers.model.Clunks',
    autoLoad: true,
    pageSize: 5,
    autoLoad: true,

    storeId: 'Resources',
	proxy: {
                type: 'ajax',
                url: API_URL +'?id='+ USER_ID + '&action=myclunks&rand='+ Math.random(),

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