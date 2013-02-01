Ext.define('Cheers.view.Report', {
    extend: 'Ext.form.Panel',    
    xtype: 'reportType',
    id: 'reportId',
    config: {     
            title:'',
             iconCls: 'User',
             scrollable:true, 
             hidden:true,
            
            
             fullscreen: true,
         
        
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
                        align:'right',
                        id: 'submitReport'
                    }
                    
                   
                ]
            },
            
            {
                xtype: 'fieldset',
                title: 'Please help us fix this.',
                items: [
                    
                    {
                        xtype: 'textfield',
                        label: 'I am at?',
                        name: 'location_set'
                        
                    },
                    {
                        xtype:'textareafield',
                        label:'Other info that may help.',
                        name: 'other'
                    },
                    {
                        xtype: 'textfield',
                        label: 'Detected Location',
                        name: 'location_detected',
                        value: LOCATION_NAME,
                        readOnly:true
                    },
                    {
                        xtype: 'textfield',
                        label: 'Latitude',
                        name: 'lat',
                        value: LAT,
                        readOnly:true
                    },
                    {
                        xtype: 'textfield',
                        label: 'Longitude',
                        name: 'lon',
                        value: LON,
                        readOnly:true
                    } 
                    
                ]
            }
        ]
    }

});