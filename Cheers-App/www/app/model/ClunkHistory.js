Ext.define('Cheers.model.ClunkHistory', {
    extend: 'Ext.data.Model',
    config: {
    idProperty: 'id',
    fields: [
              'id',
              'facebook_uid',
              'first_name',
              'last_name',
              'bp',
              'date'
         
              ]
    }
});