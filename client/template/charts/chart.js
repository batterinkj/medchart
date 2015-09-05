Template.chart.helpers({
  medChart: function(){
    //if(Session.get("activeChart") != "") return Charts.find({"_id":Session.get("activeChart")._id}).fetch()[0]
    //else return Charts.findOne()
    return Charts.findOne(this._id);
    
  },
  columnNames: function(){
    return ColumnNames.find();
  },
  row: function(){
    return Rows.find({"chartId":this._id}).fetch();
  },
  column: function(){
    return this.row;
  },
  hospitalName: this.hospitalName,
  patientName: this.patientName,
  showHospitalNameForm: function(){
    if (Session.get("showHospitalNameForm") === undefined|| Session.get("showHospitalNameForm") === true){
      return true
    }else{
      return false;
    }
  },
  showPatientNameForm: function(){
    if (Session.get("showPatientNameForm") === undefined|| Session.get("showPatientNameForm") === true){
      return true
    }else{
      return false;
    }
  },

})
Template.chart.events({
  'focusout #hospitalNameEntry' : function(){
    Meteor.call("chartUpdate",{chartId:this._id,update:{"hospitalName":$('#hospitalNameEntry').val(),"patientName":$('#patientNameEntry').val()||$("#patientName").html()}})
    Session.set("showHospitalNameForm", false)
    //Charts.update(Session.get("activeChart")._id,{$set: {"hospitalName":$('#hospitalNameEntry').val()}})
  },
  'focusout #patientNameEntry' : function(){
    Meteor.call("chartUpdate",{chartId:this._id,update:{"hospitalName":$('#hospitalNameEntry').val()||$("#hospitalName").html(),"patientName":$('#patientNameEntry').val()}})
    Session.set("showPatientNameForm", false)
    //Charts.update(Session.get("activeChart")._id,{$set: {"patientName":$('#patientNameEntry').val()}})
  },
  'click #deleteRowButton' : function(){
    Meteor.call("rowDelete", this._id);
  },

  'click #addRowButton' : function(){
    var setEntryRow = function(error, result){
      Session.set("entryRow",Rows.findOne(result))
    }
    Meteor.call("rowInsert",{
        chartId:this._id,
            drugName:"",
            drugDose:"",
            dosetime1:"",
            dosetime2:"",
            dosetime3:"",
            dosetime4:"",
            indication:""
        },setEntryRow)
  },
  'click #hospitalName' : function(){
     Session.set("showHospitalNameForm", true)
  },
  'click #patientName' : function(){
     Session.set("showPatientNameForm", true)
  }
})