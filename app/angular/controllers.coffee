"use strict"

###
  Controllers
###



ChatCtrl = ($scope, Socket) ->
    $scope.content = ''
    $scope.pseudo = prompt 'Quel est votre nom ?'
    $scope.messages = []

    Socket.on 'message', (data) ->
        $scope.messages.push { author : data.author, message : $scope.decodeStr(data.message) }

    $scope.crypt = ( inputStr ) ->
        if inputStr? then array = inputStr.split('')
        outputStr = [] 
        for char in array then outputStr.push $scope.cryptChar char
        outputStr

    $scope.decodeChar = (inputChar) ->  
        codeAlpha = ['/-\\', '8', '₡', '[)', '[-', '|=', '@', '{-}', 'l', ',)', '|<', '£', '|^^|', '|\\|', '0', '|°', 'é', '|°\\', '$', '7', '|_|', '\\/', 'VV', '><', '`/', '7_' ]
        realAlpha = ['a'   , 'b', 'c', 'd',   'e',  'f', 'g',  'h',  'i',  'j', 'k',  'l',   'm',    'n',  'o', 'p',  'q',   'r',  's', 't',  'u',   'v',    'w', 'x',   'y', 'z'  ]
        outputChar = ''
        for i in [0...codeAlpha.length]
            if inputChar == codeAlpha[i] 
                outputChar = realAlpha[i]
                break 
            else 
                outputChar = inputChar 
                continue
        outputChar
    
    $scope.decodeStr = (inputStr) ->
        outputStr = '' 
        addChar = ''
        for i in [0...inputStr.length]
            addChar = inputStr[i]
            outputStr = outputStr + $scope.decodeChar addChar
        outputStr
        
    $scope.cryptChar = ( inputChar ) ->     
        codeAlpha  = ['/-\\', '8', '₡', '[)', '[-', '|=', '@', '{-}', 'l', ',)', '|<', '£', '|^^|', '|\\|', '0', '|°', 'é', '|°\\', '$', '7', '|_|', '\\/', 'VV', '><', '`/', '7_' ]
        realAlpha  = ['a'   , 'b', 'c', 'd',   'e',  'f', 'g',  'h',  'i',  'j', 'k',  'l',   'm',    'n',  'o', 'p',  'q',   'r',  's', 't',  'u',   'v',    'w', 'x',   'y', 'z'  ]

        for i in [0...realAlpha.length] by 1
            if inputChar == realAlpha[i]
                outputChar = codeAlpha[i]
                break
            else 
                continue
        if !outputChar? then inputChar                  
        else outputChar

    $scope.send = ->
        message = { author : $scope.pseudo, message : $scope.crypt($scope.content) }
        Socket.emit 'newMessage', message
        $scope.content = ''

ChatCtrl.$inject = [ "$scope", "Socket" ]


EnigmaCtrl = ($scope, Enigma, $timeout) ->
    $scope.alphabet = [ 'a', 'b', 'c', 'd', 'e',  'f', 'g',  'h',  'i', 'j', 'k', 'l', 'm', 'n',  'o', 'p',  'q', 'r',  's', 't', 'u', 'v', 'w', 'x', 'y', 'z' ]
    $scope.codedMessage = ''
    $scope.message = ''

    $scope.click = (c) ->
        ec = Enigma.Click c
        $scope.message = $scope.message + c
        $scope.codedMessage = $scope.codedMessage + ec
        out = angular.element(document.getElementById(ec))
        out.removeClass('off')
        out.addClass('on')
        $timeout(->
            out.removeClass('on')
            out.addClass('off')
        , 1000)
        off
            


    $scope.reset = -> 
        Enigma.Init()
        $scope.message = ''
        $scope.codedMessage = ''


EnigmaCtrl.$inject = [ "$scope", "Enigma", "$timeout" ]