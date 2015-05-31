Template.home.events({
  'change [data-action=upload-xml]': function(e, template) {
    readFile(e.currentTarget, template);
  },

  'change [data-action=upload-html]': function(e, template) {
    readFile(e.currentTarget, template);
  }
});

var readFile = function(input, instance) {
  var textTypeXML = 'text/xml';
  var textTypeHTML = 'text/html';
  var file;

  var isXML = false;
  var isHTML = false;

  if (input.files && input.files[0]) {
    file = input.files[0];
  } else {
    Helpers.notify("No file found.");
    return;
  }

  if (file.type === textTypeXML) isXML = true;
  if (file.type === textTypeHTML) isHTML = true;

  if (isXML || isHTML) {
    var FR = new FileReader;

    FR.onload = function(e) {

      var data = FR.result;

      if (data) {
        if (isXML) {
          Meteor.call('File.processXML', data, function(err, res) {
            if (err) {
              Helpers.notify(err.reason);
            } else {
              console.log(res);
            }
            input.value = '';
          });
        } else if (isHTML) {
          var obj = readHTML(data);
          Meteor.call('File.processHTMLObj', obj, function(err, res) {

          });
          input.value = '';
        }
      }
    };

    FR.readAsText(file);
  } else {
    Helpers.notify("File must be .xml or .html");
    input.value = '';
    return;
  }
};

var readHTML = function(data) {
  var $html = $.parseHTML(data);
  $('#temp-data').append($html);

  var data = [];
  var $table = $('[name=closed_trades]');
  var headers = getHeaders($table);

  $table.find('tr').each(function() {
    var rowData = getRowData(headers, this);
    if (rowData) {
      data.push(rowData);
    }
  });
  return data;
};

var getHeaders = function($table) {
  var headers = [];

  $table.find('.header').each(function() {
    headers.push($(this).text());
  });
  return headers;
};

var getRowData = function(headers, tr) {
  var data = $(tr).find('td');
  if (headers.length === data.length) {
    var cellOne = data.first().text();

    if (_.contains(headers, cellOne)) return;

    var d = {};
    _.each(headers, function(header, i) {
      d[header] = $(data[i]).text();
    })

    return d;
  }
};
