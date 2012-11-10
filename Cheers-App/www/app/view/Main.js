Ext.define("Cheers.view.Main", {
    extend: 'Ext.tab.Panel',
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
                              {
                                xtype: 'button',
                                text: 'Sim-Match',
                                id: 'sim_match'
                                
                                

                               } ,
                               {
                                xtype: 'button',
                                text: 'Sim-No-Match',
                                id: 'sim_nomatch'

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
                title: 'Find Friends',
                iconCls: 'team',

                items: [
                    {
                        html: '<div>[VENDOR]</div><div>You have xx points to a free beer at [VENDOR]</div><div style="background-color:yellow"><img src="cheers.png" width="275"></div>'
                        
                    }
                     
                ]
            },
            {
                title: 'Find Deals',
                iconCls: 'search',

                items: [
                    {
                        html: 'place holder'
                        
                    }
                     
                ]
            },
            {
                title: 'My Clunks',
                iconCls: 'star',

                items: [
                    {
                        html: 'place holder'
                        
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
