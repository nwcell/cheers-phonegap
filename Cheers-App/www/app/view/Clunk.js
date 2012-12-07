 
Ext.define('Cheers.view.Clunk', {
    extend: 'Ext.Panel',
    xtype:  'ClunkType',
    
    config: {
             title:'Clunk',
             iconCls: 'home',
             scrollable:false,
              
             fullscreen: true,
             cls: 'logo',
        
        items: [
             
            {
                html: '<div style="top:+25px;position:relative">Tap Root Bar</div>',
                cls: 'bg_location'
            },
            {
                html: '[points]'
            },
            {
                html:'[title]'   
            },
            {
                html: '[badges]'
            }
        ]
    }

});