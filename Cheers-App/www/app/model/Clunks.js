Ext.define('Cheers.model.Clunks', {
    extend: 'Ext.data.Model',
    config: {
    idProperty: 'id',
    fields: [
              'id',
              'facebook_uid',
              'user_id',
              'total',
              'last_clunked',
         
              ]
    }
});