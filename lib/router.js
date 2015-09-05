Router.configure({
    layoutTemplate: 'layout'
})

Router.route('/', function () {
  this.render('home');
    },{
        name:"home"
    });

Router.route('/charts/:_id', {
    name: 'chartPage',
    data: function(){return Charts.findOne(this.params._id);}
});

Router.route('/chartNew',function(){
        var self = this;
        Meteor.call("chartInsert",
            {hospitalName:"New Hospital Name",
             patientName:"New Patient Name"
                
            }, function(error,result){ self.redirect('/charts/'+result)}
        )
    },{
    name: 'chartNew'
})