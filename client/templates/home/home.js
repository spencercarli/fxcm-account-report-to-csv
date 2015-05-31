Template.home.events({
  'change [data-action=upload]': function(e, template) {
    readFile(e.currentTarget, template);
  }
});

var readFile = function(input, instance) {
  var textType = 'text/xml';
  var file;

  if (input.files && input.files[0]) {
    file = input.files[0];
  } else {
    Helpers.notify("No file found.");
    return;
  }

  if (file.type === textType) {
    var FR = new FileReader;

    FR.onload = function(e) {

      var data = FR.result;

      if (data) {
        Meteor.call('File.process', data, function(err, res) {
          if (err) {
            Helpers.notify(err.reason);
          } else {
            console.log(res);
          }
          input.value = '';
        });
      }
    };

    FR.readAsText(file);
  } else {
    Helpers.notify("File must be .xml");
    return;
  }
};
