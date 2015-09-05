Template.chartRow.helpers({
    entryRow: function(){
        if (this._id == Session.get("entryRow")._id){
            return true;
        }else{
            return false;
        }
    },
    column: function(){
      var sizes = ["col-xs-2","col-xs-2","col-xs-1","col-xs-1","col-xs-1","col-xs-1","col-xs-3","col-xs-1"]
      return this.row.map(function(item,index){return {"item":item,"index":index, "size":sizes[index]}});
    },
    
    drugNameColumn: function(){
      return this.index==0;
    },
    
    autoComplete: function() {
    return {
      position: "top",
      limit: 5,
      rules: [
        {
          token: '',
          collection: DrugData,
          field: "drug_name",
          template: Template.userPill
        }]}
      
    }
})

Template.chartRow.events({
  'click #saveRowButton': function(){
    Session.set('entryRow',"");
  },
  
  'focusout input.chartField': function(){
    Meteor.call("rowUpdate",{
            rowId: Session.get("entryRow")._id,update:{
            drugName:$('#drugNameInput').val(),
            drugDose:$('#drugDoseInput').val(),
            dosetime1:$('#dosetime1Input').val(),
            dosetime2:$('#dosetime2Input').val(),
            dosetime3:$('#dosetime3Input').val(),
            dosetime4:$('#dosetime4Input').val(),
            indication:$('#indicationInput').val()
        }})
  },
  
  'click .chartRow': function(){
    Session.set('entryRow',this);
  }
      //$('input.chartField').each(function(){row.push($(this).val())});
    //Charts.update(Session.get("activeChart")._id,{$set: {"hospitalName":$('#hospitalNameEntry').val()}})
})