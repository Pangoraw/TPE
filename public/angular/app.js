"use strict";

/*
  Declare app level module which depends on filters, services, and directives
 */
angular.module("myApp", ["ngRoute", "ngSanitize", "myApp.filters", "myApp.services", "myApp.directives"]).config([
  "$routeProvider", function($routeProvider) {
    $routeProvider.when("/chat", {
      templateUrl: "partials/chat",
      controller: ChatCtrl
    });
    $routeProvider.when("/enigma", {
      templateUrl: "partials/enigma",
      controller: EnigmaCtrl
    });
    return $routeProvider.otherwise({
      redirectTo: "/chat"
    });
  }
]);
