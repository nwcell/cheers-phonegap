Ext.define('Cheers.view.Report', {
    extend: 'Ext.Panel',    
    id: 'ReportId',
    config: {             
             scrollable:true,
             layout: 'fit',
        
        items: [
           {
                xtype: 'titlebar',
                docked: 'top',                 
                title: 'Report',
                
                items: [
                    {
                        xtype: 'button',
                        id: 'backFromReport',
                        ui: 'back',
                        align:'left',
                        text: 'Back'
                      
                    },
                    {
                        xtype: 'button',
                        text: 'Submit',
                        ui: 'confirm',
                        align:'right'
                    }
                    
                   
                ]
            },
            
            {
                xtype: 'fieldset',
                title: 'Please help us fix this.',
                items: [
                    
                    {
                        xtype: 'textfield',
                        label: 'I am at?' 
                        
                    },
                    {
                        xtype:'textareafield',
                        label:'Other info that may help.'
                    },
                    {
                        xtype: 'textfield',
                        label: 'Detected Location',
                        readOnly:true
                    },
                    {
                        xtype: 'textfield',
                        label: 'Latitude',
                        value: LAT,
                        readOnly:true
                    },
                    {
                        xtype: 'textfield',
                        label: 'Longitude',
                        value: LON,
                        readOnly:true
                    } 
                    
                ]
            }
        ]
    }

});