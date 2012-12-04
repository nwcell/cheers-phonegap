 var store = Ext.create('Ext.data.Store', {
           model: 'Cheers.model.Deal',
           proxy: {
                   type: 'ajax',
                   url :API_URL +'?id='+ USER_ID + '&lat='+ LAT +'&lon='+ LON + '&action=deals&rand='+ Math.random(),	
                   reader : {
                                     type : 'json',
                                     rootProperty: ''
                           }
           }
           });
store.load();

Ext.define('Cheers.view.DealsList', {
    extend: 'Ext.dataview.DataView',
    alias: 'widget.timeline',

    config: {
        store: store,
        itemTpl: [
            '<div class="tweet"><div class="avatar"><img src="{photo_url}" /></div><div class="tweet-content"><h2>{bp_name}</h2><p>{text}</p><p>{distance} mile(s) away</p></div></div>'
        ]
    }

});