Meteor.publish('charts',function(){
      return Charts.find({'userId':this.userId})
    });
Meteor.publish('rows',function(){
  return Rows.find({'userId':this.userId})
});
Meteor.publish('columnNames',function(){
  return ColumnNames.find();
});

Meteor.publish('DrugData',function(){
  return DrugData.find();
})