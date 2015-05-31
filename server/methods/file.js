Meteor.methods({
  'File.processXML': function(data) {
    xml2js.parseString(data, {}, function(err, res) {
      console.log('err', err);
      if (err) {
        throw new Meteor.Error(400, "An error occured.");
      }
      // console.log('res', JSON.stringify(res));
      var data = res['ss:Workbook']['ss:Worksheet'][0]['ss:Table'];
      console.log(JSON.stringify(data[0]['ss:Row'][30]));
    });
    return 'Response';
  },

  'File.processHTMLObj': function(data) {
    console.log(JSON.stringify(data));
    return 'Response';
  }
});
