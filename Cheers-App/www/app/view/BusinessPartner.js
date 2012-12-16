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
                        title: 'Tap Root 1',

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
                         html:'50 /100 Points',
                         id:'bp_name',
                         cls:'bp_name_cls'
                     },
                     {
                        html: '',
                        id: 'bpbg_description',
                        cls: 'bpbg_description_cls'
                     },
                     {
                        html:'Some description here',
                        id: 'bp_descroption',
                        cls: 'bp_description_cls'
                     },
                     {
                        html: '',
                        id: 'bpbg_status',
                        cls: 'bpbg_status_cls'
                     },
                     {
                        html:'Your rank - Alpha Player',
                        id: 'bp_status',
                        cls: 'bp_status_cls'
                     },
                     
                      {
                        html: '',
                        id: 'bpbg_badge',
                        cls: 'bpbg_badge_cls'
                     },
                     {
                        html:'Badge1, Badge2, Badge3',
                        id: 'bp_badge',
                        cls: 'bp_badge_cls'
                     },
                     {
                        html:'Recent Clunkmates<br><div style="width:320px;padding:15px"><img src="http://profile.ak.fbcdn.net/hprofile-ak-ash4/373042_216311481960_1625208104_q.jpg" align="left"> Bill Gates<br> 5 Hours ago</div>\n\
                              <div style="width:320px;padding:15px"><img src="http://profile.ak.fbcdn.net/hprofile-ak-ash4/373042_216311481960_1625208104_q.jpg" align="left"> Bill Gates<br> 5 Hours ago</div>        ',
                        id: 'bp_recent',
                        cls: 'bp_recent_cls'
                     },
                     
                     
                    
             ]

          
     }
});

