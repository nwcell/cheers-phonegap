 
Ext.define('Cheers.view.Clunk', {
    extend: 'Ext.Panel',
    xtype:  'ClunkType',
    id: 'clunkView',
    
    config: {
             title:'Clunk',
             iconCls: 'home',
             scrollable:false,
              
             fullscreen: true,
             cls: 'logo',
        
        items: [
             
            {
                html: '',
                cls: 'bg_location',
                id: 'bglocation'
            },
            {
                html: '',
                id: 'location_text',
                cls: 'location_name'
            },
            {
                html: '<span id="bug_report">Not your location</span>',
                id: 'bugreport',
                cls: 'bugreport_cls'
            },
            {
                 html: '<div style="top:18px;position:relative;left:+20px"></div> ',
                 cls: 'bg_points',
                 id: 'bgpoints'
            },
            {
                html:'',
                id: 'points_text',
                cls: 'points_cls'
            },
            {
                html:'<div style="height:25px;width:1px;background-color:#b25538"></div>',
                id: 'pointsbar',
                cls: 'pointsbar_cls'
            },
            {
                html:'<div style="height:25px;width:220px;background-color:gray"></div>',
                id: 'pointsbardisabled',
                cls: 'pointsbardisabled_cls'
            },
             
            {
                html: '<!--<img src="images/timer_12.png">-->',
                id:   'pointstimer',
                cls:  'pointstimer_cls'
            }
            ,
            {
               
                html: '',
                cls: 'bg_status',
                id: 'bgstatus'
            },
            {
                html:'',             
                id: 'statustext',
                cls:'statustext_cls'
            },
            {
               
                html: '',
                cls: 'bg_badges',
                id: 'bgbadges'
            }, 
            {
                html:'',
                id: 'badgetext',
                cls:'badgetext_cls'
            },
            {
                html:'no connection',
                id:'clunkability',
                cls:'clunkability_cls'
            },
            {
           html:'<span class="refresh" id="refresh_id">Check location again</span>',  
               cls: 'refresh_cls',               
               id: 'refresh_location',
              /* listeners:[
                {
                    element: 'element',
                    delegate: 'span.refresh',
                    event:'tap',
                    fn: function(){
                       this.fireEvent('clunkViewUpdate');
                    }
                }
               ]*/
               
            }
            /*{
              xtype:'button',
              text: 'sim-match',
              width:'5%',
              id: 'sim_match'
            }*/
        ]
    }

});