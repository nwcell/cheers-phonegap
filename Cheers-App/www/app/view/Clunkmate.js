         
Ext.define("Cheers.view.Clunkmate", {
    extend: "Ext.Panel",  
    xtype: 'ClunkMateXtype',
    id: 'Clunkmate',
    config: {
              title:'',
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

