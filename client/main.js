Meteor.subscribe('charts')
Meteor.subscribe('rows')
Meteor.subscribe('columnNames');
Meteor.subscribe('DrugData');

Session.set("activeChart","");
Session.set("entryRow","");



