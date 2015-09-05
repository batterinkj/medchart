columnNames = new Mongo.Collection('columnNames');
charts = new Mongo.Collection('charts');
rows = new Mongo.Collection('rows');
DrugData = new Mongo.Collection('drugData');//{drugName:"",doses:[{strength:"",form:"",strengthUnits:""}]}
DrugData.initEasySearch('drugName',{'use' : 'mongo-db'})


var chartNew = function(hospitalName,patientName){
  charts.insert({chart:{hospitalName: hospitalName, patientName: patientName}});
}

var clearEntryRow = function(){
  $('input.chartField').each(function(){$(this).val("")})
}


if (Meteor.isClient) {
  Session.set("activeChart","");
  
  // counter starts at 0
  Meteor.subscribe('charts')
  Meteor.subscribe('rows')
  Meteor.subscribe('columnNames');
  Session.setDefault('counter', 0);

  Router.route('/', function () {
  this.render('Home');
  });
  
  Template.entryRow.helpers({
    numNames: function(){
      return [1,2,3,4,5,6];
    },
    
    autoComplete: function() {
    return {
      position: "top",
      limit: 5,
      rules: [
        {
          token: '',
          collection: DrugData,
          field: "drugName",
          template: Template.userPill
        }]}
      
    }
  });
  
  Template.chartSelect.helpers({
    autoComplete: function() {
    return {
      position: "top",
      limit: 5,
      rules: [
        {
          token: '',
          collection: charts,
          field: "patientName",
          //filter: {userId:Meteor.userId()},
          template: Template.chartFound
        }]}
    }
  });
  
  Template.chartSelect.events({
      "autocompleteselect input": function(event, template, doc) {
        Session.set("activeChart", doc)
       }
  });
  
  Template.table.helpers({
    medChart: function(){
      if(Session.get("activeChart") != "") return charts.find({"_id":Session.get("activeChart")._id}).fetch()[0]
      else return charts.findOne()
      
    },
    columnNames: function(){
      return columnNames.find();
    },
    row: function(){
      return rows.find({"chart_id":this._id}).fetch();
    },
    column: function(){
      return this.row;
    },
    hospitalName: this.hospitalName,
    patientName: this.patientName
    
  })
  Template.table.events({
    'focusout #hospitalNameEntry' : function(){
      charts.update(Session.get("activeChart")._id,{$set: {"hospitalName":$('#hospitalNameEntry').val()}})
    },
    'focusout #patientNameEntry' : function(){
      charts.update(Session.get("activeChart")._id,{$set: {"patientName":$('#patientNameEntry').val()}})
    },
    'click #deleteRowButton' : function(){
      rows.remove(this._id);
    },
    
    'click #newChartButton' : function(){
      var newChart = charts.insert({hospitalName:"New Hospital Name",patientName:"New Patient Name",userId:Meteor.userId()})
      Session.set("activeChart",charts.findOne(newChart));
      clearEntryRow();
      
    }
  })
  Template.entryRow.events({
    'click #addRowButton' : function(){
      var row = [];
      $('input.chartField').each(function(){row.push($(this).val())});
      rows.insert({"chart_id":this._id,"userId":Meteor.userId(), "row":row});
       clearEntryRow();
    },
  })
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at start*up

  })
  
    Meteor.publish('charts',function(){
      return charts.find({'userId':this.userId})
    });
    Meteor.publish('rows',function(){
      return rows.find({'userId':this.userId})
    });
    Meteor.publish('columnNames',function(){
      return columnNames.find();
    })
  };

