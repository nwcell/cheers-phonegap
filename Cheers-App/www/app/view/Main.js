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
              xtype: 'ClunkType'  
            },
            {
              title:'Friends',
              iconCls: 'team',
             scrollable:true,
               layout: 'fit',
               id: 'Clunks',
             
             items:[
                    {
                            xtype: 'list',
                           itemTpl: '<div  >\n\
                                       <div ><img src="https://graph.facebook.com/{facebook_uid}/picture" width="44px" height=44px"> {first_name} {last_name}\n\
                                         </div>\n\
                                     <div >Times Clunked: {total}<br> Last Clunked:{last_clunked}</div>\n\
                                    </div>',
                            id: 'myClunksList',
                           
                             
                             
                    } 
             ]

          
           },
           {
                 xtype: 'DealsMap'
           },
          
            
            
          {
                title: 'History',
                iconCls: 'star',
                id: 'historyView',
                layout: 'fit',
                scrollable:true,
                items: [
                    
                  
                     
                     
                ]
            },
             {
                title: 'Settings',
                iconCls: 'settings',

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
                   },
                   {
                      xtype: 'fieldset',
                      title: 'Debug',
                      items:[
                          {
                            xtype: 'togglefield',
                            label: 'Debug On',
                            name: 'debug',  
                            id: 'debugOn',
                            value: DEBUG
                          },
                          {
                            xtype: 'textfield',
                            label: 'Bump With ID',
                            name: 'bump_with',
                            id: 'debugBumpWith',
                            value: DEBUG_BUMP_WITH
                          },
                          {
                            xtype: 'textfield',
                            label: 'Force Latitude',
                            name:'lat',
                            id: 'debugLat',
                            value: DEBUG_LAT
                                                           

                          },
                          {
                            xtype:'textfield',
                            label:'Force Longitude',
                            id: 'debugLon',
                            name: 'lon',
                            value:DEBUG_LON
                          },
                          {
                           xtype:'button',
                           text: 'Update',
                           id: 'debugUpdate'
                          }
                      ]
                   }
                   
                ]
            },
            
            {
              xtype: 'businessPartnerType'
            },
            {
              xtype: 'redeemType'
            }
          ,
        ]
    }
});
