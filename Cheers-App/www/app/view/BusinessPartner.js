Ext.define("Cheers.view.BusinessPartner", {
    extend: "Ext.Panel",  
    xtype: 'businessPartnerType',
    id: 'businessPartner',
    config: {
              
             title:'',
             iconCls: 'User',
             scrollable:true, 
             hidden:true,
            
            scrollable: true,
            fullscreen: true,
             cls: 'businessPartner',
            
             
             items:[
                     {
                        xtype: 'titlebar',
                        docked: 'top',                 
                        title: '',
                        id:'businessPartnerTitle',

                        items: [
                            {
                                xtype: 'button',
                                id: 'backFromBp',
                                ui: 'back',
                                align:'left',
                                text: 'Back'
                                //iconMask: true
                            },
                             


                        ]
                    },
                    {
                      html:'<div style="height:600px"></div>'
                    },
                   {
                    html: '',
                    id: 'bpbg_name',
                    cls: 'bpbg_name_cls'
                     },
                     {
                         html:'',
                         id:'bp_name',
                         cls:'bp_name_cls'
                     },
                     {
                         html: '10/100',
                         id: 'bp_points_text',
                         cls: 'bp_points_text_cls'
                     },
                     {
                        html: '',
                        id: 'bpbg_description',
                        cls: 'bpbg_description_cls'
                     },
                     {
                        html:'', 
                        id: 'bp_description',
                        cls: 'bp_description_cls'
                     },
                     {
                        html: '',
                        id: 'bpbg_status',
                        cls: 'bpbg_status_cls'
                     },
                     {
                        html:'',
                        id: 'bp_status',
                        cls: 'bp_status_cls'
                     },
                     
                      {
                        html: '',
                        id: 'bpbg_badge',
                        cls: 'bpbg_badge_cls'
                     },
                     {
                        html:'',
                        id: 'bp_badge',
                        cls: 'bp_badge_cls'
                     },
                     {
                         html:'<div style="font-size:10px">Recent Clunkmates</div>',
                         cls: 'bp_recent_head_cls'
                     },
                     {
                        html:'',
                        id: 'bp_recent',
                        cls: 'bp_recent_cls'
                     },
                     
                     
                    
             ]

          
     }
});

