Meteor.startup(function() {
  if (DrugData.find().fetch().length ===0){
        var test = JSON.parse(Assets.getText('drugdata.json'));
        var unique = {}
        for(var i = 0; i < test.length;i++){
            if (unique[test[i]["drug_name"]]===undefined){
                DrugData.insert({"drug_name":test[i]["drug_name"]})
                unique[test[i]["drug_name"]] = "here"
                
            }
        }
  }
  
  return Meteor.methods({

      removeAllDrugData: function() {

        return DrugData.remove({});

      },
      removeAllRows: function() {

        return Rows.remove({});

      }
      
    });
});