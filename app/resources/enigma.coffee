{
  AlphabetNum  : [ '0' , '1' , '2', '3', '4', '5', '6', '7',  '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25'  ]
  Alphabet     : [ 'a' , 'b' , 'c', 'd', 'e', 'f', 'g', 'h',  'i', 'j', 'k',  'l',  'm',  'n',  'o',  'p',  'q',  'r',  's',  't',  'u',  'v',  'w', 'x',  'y' , 'z' ]
  Permutation1 : [ '0' , '23', '2', '3', '4', '5', '6','18', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '7', '19', '20', '21', '22', '1' , '24' ,'25'  ]
  WheelOne     : [ '14', '13', '5', '2','12','19','16','21', '8', '4', '10', '25', '11', '6' , '3',  '1',  '23' , '0', '7', '9', '15', '17', '20',  '24', '18','22' ]
  Mirror       : [ '14', '15','16','17','18','19','20','21', '22', '23', '24', '25', '0', '1', '2', '3',  '4',   '5', '6', '7',  '8', '9',  '10',  '11', '12', '13' ]

  WheelSteps : 0

  GetNumIndex : (c) ->
    for i in [0..Alphabet.length]
      if @Alphabet[i] == c then i
      else continue
    -1

  IncrementWheel : -> @WheelSteps = @WheelSteps++

  ReverseWheelOneValue : (n) ->
    for i in [0..AlphabetNum.length]
      if @WheelOne[(ec + @WheelSteps) %% 26] == n then return i
      else continue
    -1

  Click : (c) ->
    ec = Permutation1[@GetNumIndex c]
    ec = @WheelOne[(ec + @WheelSteps) %% 26]
    ec = @Mirror[ec]
    ec = @ReverseWheelOneValue ec
    @IncrementWheel()
    Alphabet[ec]
}