Ext.define("Cheers.view.ClunkmateDetail", {
    extend: "Ext.Panel",  
    xtype: 'ClunkmateDetailType',
    
    config: {
              
             title:'',
             iconCls: 'User',
             scrollable:true, 
             hidden:true,
            
             scrollable: false,
             fullscreen: true,
           
            
             
             items:[
                    {
                        xtype: 'hiddenfield',
                        value: '',
                        id: 'clunk_with_fr'
                    },
                    {
                        xtype: 'titlebar',
                        docked: 'top',                 
                        title: '',
                        id:'clunkMateDetailTitle',

                        items: [
                            {
                                xtype: 'button',
                                id: 'backFromClunkMateDetail',
                                ui: 'back',
                                align:'left',
                                text: 'Back'
                                //iconMask: true
                            }
                           
                             


                        ]
                     },
                     {
                    xtype: 'togglefield',
                    label: 'Can see him/her',
                    name: 'show_him_fr',  
                    id: 'show_him_fr',
                    listeners: {
                        change: function(slider, thumb, newValue, oldValue) {
                           
                          // store = Ext.getStore("Clunkmate");
                           //console.log('Record?');
                           //console.log(record);
                           //console.log(newValue);
                           
                           //record.set('show_him',newValue);
                           //store.sync();
                           
                                   clunk_with_fr = Ext.getCmp("clunk_with_fr").getValue();
                                   Ext.Ajax.request({
                                   url: API_URL,
                                   async : false,
                                   params: {
                                   id: USER_ID,
                                   clunkmate: clunk_with_fr,
                                   action: 'setClunkmateHim',
                                   show_him: newValue,
                                   
                                   random: Math.random()
                                   },
                                   success: function(response, opts) {

                                      
                                   },
                                   failure: function(response, opts) {



                                    }

                                     });

                          }
                      }
                    
                    },
                     {
                        xtype: 'togglefield',
                        label: 'He/She can see me',
                        name: 'show_me_fr',  
                        id: 'show_me_fr',
                           listeners: {
                            change: function(slider, thumb, newValue, oldValue) {

                               console.log(newValue);
                                       clunk_with_fr = Ext.getCmp("clunk_with_fr").getValue();
                                       Ext.Ajax.request({
                                       url: API_URL,
                                       async : false,
                                       params: {
                                       id: USER_ID,
                                       clunkmate: clunk_with_fr,
                                       action: 'setClunkmateMe',
                                       show_me: newValue,

                                       random: Math.random()
                                       },
                                       success: function(response, opts) {
                                      
                                       },
                                       failure: function(response, opts) {



                                       }

                                });

                            }
                        }
                     
                      }
                     
                     
                    
             ]

          
     }
});

