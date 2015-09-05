Template.chartList.helpers({
    chartList: function(){
        return Charts.find();
    }
})

Template.chartList.events({
    'click #deleteChartButton': function(){
            Meteor.call("chartDelete",this._id)
    }
    
})