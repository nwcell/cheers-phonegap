Ext.define("Cheers.view.Login", {
           extend: "Ext.form.Panel",
           id: "loginview",
           config: {
           fullscreen: true,
           layout: 'vbox',
           scrollable: true,
           items:[
                  {
                  xtype: 'titlebar',
                  docked: 'top',
                  title: 'Cheers',
                  
                  },
                  {
                  xtype: 'fieldset',
                                     defaults:{
                  labelWidth: '35%'
                  },
                  items:[
                         {
                         xtype: 'button',
                         id :'loginButton',
                         text: 'Login with Facebook',
                         }
                         ]	
                  }
                  
                  ]
           }
           });