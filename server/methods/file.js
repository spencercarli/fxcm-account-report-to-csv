var fastCsv = Meteor.npmRequire('fast-csv');
var jsZip = Meteor.npmRequire('jszip');
var Future = Npm.require('fibers/future');

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

  'File.processHTMLObj': function(obj) {
    console.log(JSON.stringify(obj));
    var csv = fastCsv;
    var zip = new jsZip();
    var fut = new Future();

    var generateCSV = function() {
      csv.writeToString(obj, { headers: true }, function(err, data) {
        if (err) {
          console.log(err);
          fut.throw(err);
        } else {
          zip.file('export.csv', data);
          fut.return();
        }
      });
      fut.wait();
    }

    generateCSV();
    return zip.generate({type: "base64"});
  }
});
