Ext.define("Cheers.view.Redeem", {
    extend: "Ext.Panel",  
    xtype: 'redeemType',
    id: 'redeemPannel',
    config: {
              
             title:'',
             iconCls: 'User',
             scrollable:true, 
             hidden:true,
            
             scrollable: false,
             fullscreen: true,
             cls: 'businessPartner',
            
             
             items:[
                     {
                        xtype: 'titlebar',
                        docked: 'top',                 
                        title: 'BP Name',
                        id:'RedeemBP',

                        items: [
                            {
                                xtype: 'button',
                                id: 'backFromRedeem',
                                ui: 'back',
                                align:'left',
                                text: 'Back'
                                //iconMask: true
                            }
                           
                             


                        ]
                     },
                     {
                        html: '<div class="two" id="redeem_confirm" style="width:320px;height:100px"></div>',
                        id:   'redeem_id',
                        cls:  'redeem_cls',
                        listeners:[
                            
                            {
                                element: 'element',
                                delegate: 'div.two',
                                event: 'swipe',
                                fn: function() {
                                    alert('duh');
                                }
                            }
                        ]
                                
                     }
                   
                     
                     
                    
             ]

          
     }
});

