//dpd user stuff found here: http://docs.deployd.com/docs/users/authenticating-users.html

(function(window) {
  "use strict";
  var App = window.App || {};
  var $ = window.jQuery;
  var login_form = "[data-login=\"form\"]";

  function LoginHandler(selector) {
    if (!selector) {
      throw new Error("No selector provided");
    }

    this.$formElement = $(selector);
    if (this.$formElement.length === 0) {
      throw new Error("Could not find element with selector: " + selector);
    }
  }



  //Pressed submit on the form
  LoginHandler.prototype.addSubmitHandler = function() {
    this.$formElement.on("submit", function(event) {
      event.preventDefault();

      var data = {};
      $(this).serializeArray().forEach(function(item) {
        data[item.name] = item.value;
        console.log(item.username + " is " + item.password);
      });

      console.log(data);

      //ask dpd database if user is valid
      dpd.users.login({
        username: data.username,
        password: data.password
      }, function(result, error) {

        if (result) {
          console.log(result);
        }


        if (error) {
          console.log(error);
          if (error.status == 401) {
            console.log("incorrect credentials");
          }
        }
      });

    });
  }




  //run this function to see if user is currently logged in
  //Log current user out
  dpd.users.me(function(result, error) {
    if (result) {
      console.log(result);
      console.log("were logged in as: " + result.username);
      dpd.users.logout(function(result, error) {
        console.log("logged out");
      });
    }
  });

  //run the login handler
  App.loginHandler = new LoginHandler(login_form);
  App.loginHandler.addSubmitHandler();
  window.App = App;
})(window);
