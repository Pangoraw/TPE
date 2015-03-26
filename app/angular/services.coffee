"use strict"

###
  Services
###

socketServer = document.domain

angular.module("myApp.services", [])
.value("version", "0.3.0")
.factory("Socket",
  ["$rootScope",
    ($rootScope) ->

      socketService = {}

      socket = io.connect(socketServer)

      socketService.emit = (event, data) ->
        socket.emit event, data

      socketService.on = (event, callback) ->
        socket.on event, (data) ->
          $rootScope.$apply ->
            callback data

      socketService
  ]
)
.factory("Enigma", ->
  Enigma = {
    AlphabetNum  : [ '0', '1',  '2', '3', '4',  '5', '6', '7',  '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25'  ]
    Alphabet     : [ 'a', 'b',  'c', 'd', 'e',  'f', 'g', 'h',  'i', 'j', 'k',  'l',  'm',  'n',  'o',  'p',  'q',  'r',  's',  't',  'u',  'v',  'w',  'x',  'y', 'z' ]
    Permutation1 : [ 0, 23, 2, 3, 4,  5, 6, 18, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 7,  19, 20, 21, 22, 1,  24,25  ]
    WheelOne     : [ 14, 13, 5, 2, 12, 19, 16, 21, 8, 4, 10, 25, 11, 6, 3, 1, 23, 0, 7,  9, 15, 17,  20, 24, 18, 22 ]
    Mirror       : [ 25,  24,  23,  22,  21,  20,  19,  18,  17,  16,  15,  14,  13,  12,  11,  10,  9,  8,  7,  6,  5,  4,  3,  2,  1,  0 ]

    WheelSteps : 0

    Init : -> @WheelSteps = 0

    GetNumIndex : (c) ->
      for i in [0..25]
        if c == @Alphabet[i] then return i
        else continue
      -1

    IncrementWheel : -> @WheelSteps = @WheelSteps + 1

    ReverseWheelOneValue : (n) ->
      for i in [0..26]
        if n == @WheelOne[(i + @WheelSteps) %% 25] then return i
        else continue
      -1

    ConvertString : (str) ->
      str = str.split ''
      out = ''
      for i in [0..str.length-1]
        char = @Click str[i]
        out = out + char
      out


    Click : (c) ->
      if c?
        c = c.toLowerCase()
        ec = @Permutation1[@GetNumIndex c]
        ec = @WheelOne[(ec + @WheelSteps) %% 25]
        ec = @Mirror[ec]
        ec = @ReverseWheelOneValue ec
        ec = @Permutation1[ec]
        @IncrementWheel()
        @Alphabet[ec]
      else false
  }
  Enigma
)