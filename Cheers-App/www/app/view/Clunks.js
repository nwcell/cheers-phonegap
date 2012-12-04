         
Ext.define("Cheers.view.Clunks", {
    extend: "Ext.Panel",  
    xtype: 'ClunksXtype',
    id: 'Clunks',
    config: {
              title:'fff',
              iconCls: 'star',
             scrollable:true,
               layout: 'fit',
               fullscreen:true,
             items:[
                    {
                            xtype: 'list',
                             itemTpl: '{title}',
                        data: [
                            { title: 'Item 1' },
                            { title: 'Item 2' },
                            { title: 'Item 3' },
                            { title: 'Item 4' }
                        ]					
                             
                             
                    } 
             ]

          
     }
});

