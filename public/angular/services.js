"use strict";

/*
  Services
 */
var socketServer,
  modulo = function(a, b) { return (+a % (b = +b) + b) % b; };

socketServer = document.domain;

angular.module("myApp.services", []).value("version", "0.3.0").factory("Socket", [
  "$rootScope", function($rootScope) {
    var socket, socketService;
    socketService = {};
    socket = io.connect(socketServer);
    socketService.emit = function(event, data) {
      return socket.emit(event, data);
    };
    socketService.on = function(event, callback) {
      return socket.on(event, function(data) {
        return $rootScope.$apply(function() {
          return callback(data);
        });
      });
    };
    return socketService;
  }
]).factory("Enigma", function() {
  var Enigma;
  Enigma = {
    AlphabetNum: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25'],
    Alphabet: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
    Permutation1: [0, 23, 2, 3, 4, 5, 6, 18, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 7, 19, 20, 21, 22, 1, 24, 25],
    WheelOne: [14, 13, 5, 2, 12, 19, 16, 21, 8, 4, 10, 25, 11, 6, 3, 1, 23, 0, 7, 9, 15, 17, 20, 24, 18, 22],
    Mirror: [25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
    WheelSteps: 0,
    Init: function() {
      return this.WheelSteps = 0;
    },
    GetNumIndex: function(c) {
      var i, j;
      for (i = j = 0; j <= 25; i = ++j) {
        if (c === this.Alphabet[i]) {
          return i;
        } else {
          continue;
        }
      }
      return -1;
    },
    IncrementWheel: function() {
      return this.WheelSteps = this.WheelSteps + 1;
    },
    ReverseWheelOneValue: function(n) {
      var i, j;
      for (i = j = 0; j <= 26; i = ++j) {
        if (n === this.WheelOne[modulo(i + this.WheelSteps, 25)]) {
          return i;
        } else {
          continue;
        }
      }
      return -1;
    },
    ConvertString: function(str) {
      var char, i, j, out, ref;
      str = str.split('');
      out = '';
      for (i = j = 0, ref = str.length - 1; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
        char = this.Click(str[i]);
        out = out + char;
      }
      return out;
    },
    Click: function(c) {
      var ec;
      if (c != null) {
        c = c.toLowerCase();
        ec = this.Permutation1[this.GetNumIndex(c)];
        ec = this.WheelOne[modulo(ec + this.WheelSteps, 25)];
        ec = this.Mirror[ec];
        ec = this.ReverseWheelOneValue(ec);
        ec = this.Permutation1[ec];
        this.IncrementWheel();
        return this.Alphabet[ec];
      } else {
        return false;
      }
    }
  };
  return Enigma;
});
