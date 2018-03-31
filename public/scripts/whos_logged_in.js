//need this to run dpd stuff
//<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js" charset="utf-8"></script>
//<script src="/dpd.js" type="text/javascript"></script>

(function(window) {
  "use strict";
  var App = window.App || {};
  var $ = window.jQuery;

  function LoggedInUser() {
    this.has_loaded = false;
    this.username = null;
  }


  // this takes in a callback function (only proper way to do server calls)
  LoggedInUser.prototype.get = function(callback) {

    //check if there's someone logged in
    //this waits for response from server before running, but javascript after this won't
    dpd.users.me(function(result, error) {

      //this never seems to happen
      if (error) {
        console.log(error);
        return;
      }

      //result = user info. if result.username exists there's a user logged in
      if (result.username) {
        callback(result);
      } else {
        callback(null);
      }

    });
  }

  LoggedInUser.prototype.show_info = function() {
    this.get(function(user) {
      console.log(user);
    });
  }

  LoggedInUser.prototype.set_info = function(user_info) {
    this.has_loaded = true;
    this.username = user_info.username;
  }


  //return an array of file paths to the images
  LoggedInUser.prototype.get_my_blackmails = function(callback) {

    var get_logged_in = this.get;

    $.get("http://localhost:2403/blackmail-images/").then(function(result) {
      get_logged_in(function(user) {

        //add the blackmails that matches the id to an array
        var my_blackmails = [];
        result.forEach(function(element) {
          if (user.id == element.uploaderId) {
            if (element.subdir != "") {
              var file_path = "file_database/blackmails/" + element.subdir + "/" + element.filename;
            } else {
              var file_path = "file_database/blackmails/" + element.filename;
            }

            var from_and_to = element.subdir.split(" to ");
            var blackmail = {uploaderId: element.uploaderId, from: from_and_to[0], to: from_and_to[1], path: file_path};

            my_blackmails.push(blackmail);
          }
        });

        //put that array in the callback function
        callback(my_blackmails);
      });
    });
  }

  LoggedInUser.prototype.delete_blackmail = function (id) {

    dpd.fileupload.del(id, function(result, err) {
        if (err) {
          alert(err);
        }
        console.log(result);
    });
  }
  //run it
  App.LoggedInUser = new LoggedInUser();
  App.LoggedInUser.get(App.LoggedInUser.set_info.bind(App.LoggedInUser));
  window.App = App;
})(window);
