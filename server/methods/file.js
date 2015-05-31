Meteor.methods({
  'File.process': function(data) {
    xml2js.parseString(data, {}, function(err, res) {
      console.log('err', err);
      // console.log('res', JSON.stringify(res));
      var data = JSON.stringify(res['ss:Workbook']['ss:Worksheet'][0]['ss:Table']);
      console.log(data);
    });
    return 'Response';
  }
});
