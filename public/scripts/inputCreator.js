(function(window) {
  "use strict";
  var App = window.App || {};
  var $ = window.jQuery;

  var demand_maker = "[data-form-demandlist=\"div\"]";
  var num_demands = 0;


  var add_demand = function() {
    var $demand_input = $("<span> demand " + num_demands + ": <input type='text' class='demand' required></span>");


    num_demands++;

    $(demand_maker).append($demand_input);
    $(demand_maker).append("<br>");
  }


  App.add_demand = add_demand;
  App.add_demand(); //start with one
  window.App = App;
})(window);
