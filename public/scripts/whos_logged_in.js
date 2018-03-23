//need this to run dpd stuff
//<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js" charset="utf-8"></script>
//<script src="/dpd.js" type="text/javascript"></script>

(function(window) {
  "use strict";
  var App = window.App || {};
  var $ = window.jQuery;

  function LoggedInUser() {

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

  //run it
  App.LoggedInUser = new LoggedInUser();
  window.App = App;
})(window);
