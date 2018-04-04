(function(window) {
  "use strict";
  var App = window.App || {};
  var $ = window.jQuery;


  var get_all_blackmails = function(callback, element_container) {
    $.get("http://localhost:2403/blackmailimgs/").then(function(result) {

      //add the blackmails that matches the id to an array
      var my_blackmails = [];


      result.forEach(function(element) {

        if (element.subdir != "") {
          var file_path = "file_database/blackmails/" + element.subdir + "/" + element.filename;
        } else {
          var file_path = "file_database/blackmails/" + element.filename;
        }

        var from_and_to = element.subdir.split(" to ");
        var blackmail = {
          id: element.id,
          from: from_and_to[0],
          to: from_and_to[1],
          path: file_path
        };
        my_blackmails.push(blackmail);
      });


      //put that array in the callback function
      callback(my_blackmails, element_container);


    });

  };

  App.get_all_blackmails = get_all_blackmails;
  window.App = App;
})(window);
