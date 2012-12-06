Ext.define("Cheers.view.Main", {
    extend: 'Ext.tab.Panel',
    id: 'mainPannel',
    requires: [
        'Ext.TitleBar',
        'Ext.Video'
    ],
    config: {
        tabBarPosition: 'bottom',

        items: [
            {
                title: 'Home',
                iconCls: 'home',
                id: 'home',

                styleHtmlContent: true,
                scrollable: false,
                 
                
                items:[ {
                    title: '',
                    xtype: 'titlebar',
                    docked: 'top',
                      items:[
                              /*{
                                xtype: 'button',
                                text: 'Sim-Match',
                                id: 'sim_match'
                                
                                

                               } ,
                               {
                                xtype: 'button',
                                text: 'Sim-No-Match',
                                id: 'sim_nomatch'

                               },*/
                               
                               {
                                xtype: 'button',
                                text: 'Bumpable-NO',
                                id: 'bump_no'

                               },
                               
                               {
                                xtype: 'button',
                                text: 'Bumpable-YES',
                                id: 'bump_yes'

                               }/*,
                              {
                                xtype: 'button',
                                iconCls: 'refresh',
                                iconMask: true,
                                align: 'right',
                                id: 'refresh'

                               } */
                            ]
                   },
                   {
                       html: 'checking network connection',
                       cls: 'bumpStatus',
                       align:'right',
                       id:'bumpStatusText'
                   },
                   {
                       html:''
                   },
                    
               ]
               
            },
            {
                title: 'Redeem',
                iconCls: 'team',
                id: 'clunkmateView',
                layout: 'fit',
                scrollable:true,
                items: [
                     {
                    title: '',
                    xtype: 'titlebar',
                    docked: 'top',
                      items:[
                               
                               {
                                xtype: 'button',
                                text: 'Clunkmate Request',
                                id: 'clunkmate_request',
                                align: 'right'

                               } ,
                               
                                
                            ]
                   },
                   {
                     html: 'Your current Points is 100'  
                   },
                  /* {
                     xtype:'button',
                     text: 'Redeem'
                   }*/
                     
                     
                ]
            },
            {
                 xtype: 'DealsHandler'
            },
            {
              title:'Clunk Mate',
              iconCls: 'star',
             scrollable:true,
               layout: 'fit',
               id: 'Clunks',
             
             items:[
                    {
                            xtype: 'list',
                           itemTpl: '<div  >\n\
                                       <div ><img src="https://graph.facebook.com/{facebook_uid}/picture" width="44px" height=44px">\n\
                                         </div>\n\
                                     <div >Times Clunked: {total}<br> Last Clunked:{last_clunked}</div>\n\
                                    </div>',
                            id: 'myClunksList',
                            listener:{
                                
                            }
                             
                             
                    } 
             ]

          
     },
             {
                title: 'Account',
                iconCls: 'user',

                items: [
                    {
                    title: '',
                    xtype: 'titlebar',
                    docked: 'top',
                      items:[
                              {
                                xtype: 'button',
                                text: 'Logout',
                                ui: 'decline',
                                align: 'right',
                                id: 'logout',
                                handler: function(){
                           
                                    try{
                                     FB.logout(function(response) {
                                         
                                         window.localStorage.setItem("USER_ID", null);
                                         if (!this.Login) this.Login = Ext.create('Cheers.view.Login');
                                          Ext.Viewport.animateActiveItem(this.Login,  { type: 'fade'});

                                       
                                     });
                                    }catch(e)
                                    {
                                        alert(e);
                                    }
                                  }

                               } 
                            ]
                   } 
                ]
            }
        ]
    }
});
