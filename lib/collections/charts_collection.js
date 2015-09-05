Charts = new Mongo.Collection('charts');

Meteor.methods({
    chartInsert: function(chartAttributes){
        check(Meteor.userId(), String);
        check(chartAttributes, {
            hospitalName: String,
            patientName: String
        });
        var user = Meteor.user()
        var chart = _.extend(chartAttributes, {userId:user._id})
        var chartId = Charts.insert(chart);
        return chartId;
    },
    
    chartDelete: function(chartId){
        check(chartId, String);
        if(Charts.findOne(chartId).userId = Meteor.user()._id){
            Charts.remove(chartId);
        }
    },
    
    chartUpdate: function(chartAttributes){
        console.log(chartAttributes);
        check(Meteor.userId(), String);
        check(chartAttributes['update'], {
            hospitalName: String,
            patientName: String
        });
        Charts.update(chartAttributes['chartId'],{$set:chartAttributes['update']});
    }
    
})