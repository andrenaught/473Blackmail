var files = [];

$('.alert-success').hide();


//uploaded files are found on file_database/image_uploads/'blackmailer' to 'blackmailee'
var uploadFiles = function() {
  var fd = new FormData()
  for (var i in files) {
      fd.append("uploadedFile", files[i])
  }
  var user_to_blackmail = $('#user_to_blackmail').val();
  var blackmailer = App.LoggedInUser.username;
  var uploadFile = new XMLHttpRequest();
  uploadFile.open('POST', '/blackmail-images?subdir=' + blackmailer + ' to ' + user_to_blackmail);
  uploadFile.send(fd);
  if (uploadFile.status < 300) {
    console.log('Successful Upload');
    alert('Success!');
  } else {
    console.log('failed to upload');
    alert('Failed to upload file');
  }
};

var setFiles = function(element) {
  console.log('File Properties:', element.files);
    files = [];
    for (var i = 0; i < element.files.length; i++) {
      files.push(element.files[i]);
    }
};


  function submitHandler(fn) {

    var upload_form = "[data-upload-image=\"form\"]";
    $(upload_form).on("submit", function(event) {
      event.preventDefault();

      var data = {};
      $(this).serializeArray().forEach(function(item) {
        data[item.name] = item.value;
      });

      fn(data);

      window.location.href = "user_page.html";
    });
  }

  function create_options (users) {

    var user_selector = "[data-user-select=\"input\"]";
    users.forEach(function (user) {

      //if (user.username != App.LoggedInUser.username)
      console.log(App.LoggedInUser.username);
      var $option = $("<option></option>", {
        value: user.username
      });

      $option.append(user.username);
      $(user_selector).append($option)
    });
  }

(function(window) {
  "use strict";
  var App = window.App || {};
  var $ = window.jQuery;

  //run it
  App.Users.getOthers(create_options);
  submitHandler(uploadFiles);
  window.App = App;
})(window);
