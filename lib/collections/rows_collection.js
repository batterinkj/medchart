Rows = new Mongo.Collection('rows');

Meteor.methods({
    rowInsert: function(rowAttributes){
        check(Meteor.userId(), String);
        check(rowAttributes, {
            chartId:String,
            drugName:String,
            drugDose:String,
            dosetime1:String,
            dosetime2:String,
            dosetime3:String,
            dosetime4:String,
            indication:String
        });
        var user = Meteor.user()
        var row = _.extend(rowAttributes, {userId:user._id})
        var rowId = Rows.insert(row);
        return rowId;
    },
    
    rowDelete: function(rowId){
        check(rowId, String);
        Rows.remove(rowId);
    },
    
    rowUpdate: function(rowAttributes){
        check(Meteor.userId(), String);
        check(rowAttributes['update'], {
            drugName:String,
            drugDose:String,
            dosetime1:String,
            dosetime2:String,
            dosetime3:String,
            dosetime4:String,
            indication:String
        });
        Rows.update(rowAttributes['rowId'],{$set:rowAttributes['update']});
    }
    
})