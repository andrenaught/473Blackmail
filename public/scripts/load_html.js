(function(window) {
  "use strict";
  var App = window.App;
  var $ = window.jQuery;


  // hide/show particular html based on whether user is logged in or not
  function navbarHandler(logged_in_user) {
    var logged_in_navbar = $("[data-navbar-loggedin=\"div\"]");
    var logged_out_navbar = $("[data-navbar-loggedout=\"div\"]");

    if (logged_in_user !== null && logged_in_navbar.length !== 0) {
      logged_in_navbar.show();
      display_username(logged_in_user);
    } else if (logged_out_navbar.length !== 0) {
      logged_out_navbar.show();
    }
  }

  //display username on navbar tab
  function display_username(logged_in_user) {
    var navbar_username = $("[data-user-tab=\"anchor\"]");
    navbar_username.append(logged_in_user.username);
  }

  // prevent logged out users from accessing user-only pages
  // returns false if user is not allowed, true if they are.
  function is_allowed(logged_in_user) {
    var user_only = $("[data-page=\"user_only\"]");

    // if non-logged in user tried to enter a user-only page
    if (logged_in_user === null && user_only.length !== 0) {
      return false;
    }

    return true;
  }

  //generate blackmail html elements
  function blackmail_element (blackmail_arr) {
    var my_blackmails = "[data-my-blackmails=\"div\"]";


    if ($(my_blackmails).length !== 0)
    { 
        for (var i = 0; i < blackmail_arr.length; i++) {

        var $div = $("<div></div>");

        var $info = $("<br><br><p class='blackmail_info'></p>");
        $info.append("<span>To: " + blackmail_arr[i].to + "</span>")

        var $img = $("<img>", {
          src: blackmail_arr[i].path,
          height: 100,
        });

        console.log(blackmail_arr[i].path);
        var delete_func = "onclick='App.LoggedInUser.delete_blackmail(\"" + blackmail_arr[i].id + "\")'"; 
        var $delete_button = $("<button class='btn btn-info' " + delete_func + ">delete</button>", {

        });

        $info.append($delete_button);
        $div.append($info);
        $div.append($img);
        $(my_blackmails).append($div);
        
      }
    }
 
  } 





  // hide/show particular html based on whether user is logged in or not
  function load_html(logged_in_user) {

    //user-only page check
    if (!is_allowed(logged_in_user)) {
      window.location.href = "index.html"; //kick em out!
    } else {

      //navbar part
      navbarHandler(logged_in_user);

      //after everything has been set, then we load the entire <body>
      $("[data-body=\"div\"]").show();
    }
  }

  //run it
  App.LoggedInUser.get_my_blackmails(blackmail_element);
  App.LoggedInUser.get(load_html);
  window.App = App;
})(window);
