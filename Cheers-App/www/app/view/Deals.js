 
Ext.define('Cheers.view.Deals', {
    extend: 'Ext.tab.Panel',
    
    requires: [
        'Cheers.view.Map',
        'Cheers.view.Timeline'
    ],

    config: {
        tabBar: {
            docked: 'bottom',
          
        },
        items: [
            {
                xtype: 'titlebar',
                docked: 'top',                 
                title: 'Deals',
                
                items: [
                    {
                        xtype: 'button',
                        id: 'backFromMap',
                        ui: 'back',
                        align:'left',
                        text: 'Back'
                        //iconMask: true
                    },
                    {
                        xtype: 'button',
                        itemId: 'buttonRefresh',
                        iconCls: 'refresh',
                        iconMask: true,
                        align:'right',
                    }
                    
                   
                ]
            },
            {
                xtype: 'map',
                title: 'Map',
                iconCls: 'locate'
            },
            {
                xtype: 'timeline',
                title: 'List View',
                iconCls: 'home'
            }
        ]
    }

});