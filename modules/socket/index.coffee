returnStr = (array) ->
	out = ''
	for char in array then out = out + char
	out

exports.configure = (io) ->

	io.on 'connection', (socket) ->
		socket.on 'newMessage', (data) ->
			console.log "#{data.author} : #{returnStr(data.message)}"
			socket.emit 'message', data
			socket.broadcast.emit 'message', data

