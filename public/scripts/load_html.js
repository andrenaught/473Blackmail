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


  var display_img = function(img_path, img_id) {
    var img_element = "[data-displayed-img=\"img\"]";
    var presented_blackmail = "[data-presented-blackmail=\"div\"]";

    console.log("path: " + img_path);
    console.log("ele: " + img_element);

    get_blackmail_info(img_id);

    $(img_element).attr("src", img_path);

    //scroll to that element
    $('html, body').animate({
      scrollTop: $(presented_blackmail).offset().top
    }, 500);


  };


  App.display_img = display_img;


  var get_blackmail_info = function(img_id) {

    var demand_list = "[data-demand-list=\"ul\"]";
    var blackmail_title = "[data-blackmail-title=\"h2\"]";
    var blackmail_from = "[data-blackmail-from=\"span\"]";
    var blackmail_towards = "[data-blackmail-to=\"span\"]";
    var blackmail_info = "[data-blackmail-info=\"div\"]";


    //clear contents first
    $(blackmail_title).empty();
    $(blackmail_from).empty();
    $(blackmail_towards).empty();
    $(demand_list).empty();

    console.log(img_id);
    var query = "http://localhost:2403/blackmails?imgID=" + img_id;

    console.log(query);
    $.get(query).then(function(result) {
      console.log(result[0]);


      result[0].demands.forEach(function(val) {
        var $demand_element = $("<li>" + val + "</li>");
        $(demand_list).append($demand_element);


      });


      $(blackmail_title).append(result[0].name);
      $(blackmail_towards).append("<strong>To: </strong>" + result[0].to);
      $(blackmail_from).append("<strong>From: </strong>" + result[0].from);
    });

    $(blackmail_info).show();
  };

  var my_blackmails = "[data-my-blackmails=\"div\"]";
  var blackmails_tome = "[data-blackmails-tome=\"div\"]";
  var public_blackmails = "[data-blackmails-public=\"div\"]";

  //generate blackmail html elements
  function blackmail_element(blackmail_arr, element_container) {

    console.log(element_container);
    var displayed_img = "[data-displayed-img=\"img\"]";


    if (element_container == "[data-my-blackmails=\"div\"]") {
      var can_delete = true
    } else {
      var can_delete = false;
    }

    if ($(element_container).length !== 0) {
      for (var i = 0; i < blackmail_arr.length; i++) {

        var $div = $("<div></div>");

        var $info = $("<br><br><p class='blackmail_info'></p>");
        $info.append("<span>To: " + blackmail_arr[i].to + "</span>");




        var $img = $("<img>", {
          src: blackmail_arr[i].path,
          height: 100,
        });



        //"present" button
        var show_func = "onclick='App.display_img(\"" + blackmail_arr[i].path + "\", \"" + blackmail_arr[i].id + "\")'";
        var $show_button = $("<button " + show_func + ">Show</button>");
        $info.append($show_button);

        var demand_list = "[data-demand-list=\"ul\"]";


        //only allow deletes if its blackmails the logged in user made
        if (can_delete) {
          console.log(blackmail_arr[i].path);
          var delete_func = "onclick='App.LoggedInUser.delete_blackmail(\"" + blackmail_arr[i].id + "\")'";
          var $delete_button = $("<button class='btn btn-info' " + delete_func + ">delete</button>");
          $info.append($delete_button);

        }

        $div.append($info);
        $div.append($img);
        $(element_container).append($div);

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
  if ($(my_blackmails).length !== 0) {
    App.LoggedInUser.get_my_blackmails(blackmail_element, my_blackmails);
  }
  if ($(blackmails_tome).length !== 0) {
    App.LoggedInUser.get_blackmails_tome(blackmail_element, blackmails_tome);
  }
  if ($(public_blackmails).length !== 0) {
    App.get_all_blackmails(blackmail_element, public_blackmails);
    console.log("sfsf");
  }
  App.LoggedInUser.get(load_html);
  window.App = App;
})(window);
