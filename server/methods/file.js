Meteor.methods({
  'File.process': function(data) {
    console.log(data);
    return 'Response';
  }
});
