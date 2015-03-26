"use strict";

/*
  Controllers
 */
var ChatCtrl, EnigmaCtrl;

ChatCtrl = function($scope, Socket) {
  $scope.content = '';
  $scope.pseudo = prompt('Quel est votre nom ?');
  $scope.messages = [];
  Socket.on('message', function(data) {
    return $scope.messages.push({
      author: data.author,
      message: $scope.decodeStr(data.message)
    });
  });
  $scope.crypt = function(inputStr) {
    var array, char, j, len, outputStr;
    if (inputStr != null) {
      array = inputStr.split('');
    }
    outputStr = [];
    for (j = 0, len = array.length; j < len; j++) {
      char = array[j];
      outputStr.push($scope.cryptChar(char));
    }
    return outputStr;
  };
  $scope.decodeChar = function(inputChar) {
    var codeAlpha, i, j, outputChar, realAlpha, ref;
    codeAlpha = ['/-\\', '8', '₡', '[)', '[-', '|=', '@', '{-}', 'l', ',)', '|<', '£', '|^^|', '|\\|', '0', '|°', 'é', '|°\\', '$', '7', '|_|', '\\/', 'VV', '><', '`/', '7_'];
    realAlpha = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    outputChar = '';
    for (i = j = 0, ref = codeAlpha.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
      if (inputChar === codeAlpha[i]) {
        outputChar = realAlpha[i];
        break;
      } else {
        outputChar = inputChar;
        continue;
      }
    }
    return outputChar;
  };
  $scope.decodeStr = function(inputStr) {
    var addChar, i, j, outputStr, ref;
    outputStr = '';
    addChar = '';
    for (i = j = 0, ref = inputStr.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
      addChar = inputStr[i];
      outputStr = outputStr + $scope.decodeChar(addChar);
    }
    return outputStr;
  };
  $scope.cryptChar = function(inputChar) {
    var codeAlpha, i, j, outputChar, realAlpha, ref;
    codeAlpha = ['/-\\', '8', '₡', '[)', '[-', '|=', '@', '{-}', 'l', ',)', '|<', '£', '|^^|', '|\\|', '0', '|°', 'é', '|°\\', '$', '7', '|_|', '\\/', 'VV', '><', '`/', '7_'];
    realAlpha = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    for (i = j = 0, ref = realAlpha.length; j < ref; i = j += 1) {
      if (inputChar === realAlpha[i]) {
        outputChar = codeAlpha[i];
        break;
      } else {
        continue;
      }
    }
    if (outputChar == null) {
      return inputChar;
    } else {
      return outputChar;
    }
  };
  return $scope.send = function() {
    var message;
    message = {
      author: $scope.pseudo,
      message: $scope.crypt($scope.content)
    };
    Socket.emit('newMessage', message);
    return $scope.content = '';
  };
};

ChatCtrl.$inject = ["$scope", "Socket"];

EnigmaCtrl = function($scope, Enigma, $timeout) {
  $scope.alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  $scope.codedMessage = '';
  $scope.message = '';
  $scope.click = function(c) {
    var ec, out;
    ec = Enigma.Click(c);
    $scope.message = $scope.message + c;
    $scope.codedMessage = $scope.codedMessage + ec;
    out = angular.element(document.getElementById(ec));
    out.removeClass('off');
    out.addClass('on');
    $timeout(function() {
      out.removeClass('on');
      return out.addClass('off');
    }, 1000);
    return false;
  };
  return $scope.reset = function() {
    Enigma.Init();
    $scope.message = '';
    return $scope.codedMessage = '';
  };
};

EnigmaCtrl.$inject = ["$scope", "Enigma", "$timeout"];
