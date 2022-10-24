import socketIO from 'socket.io'

let io: socketIO.Server

export function setSockIO(value: socketIO.Server) {
	io = value
	io.on('connection', function (socket) {
		console.log(`${socket.id} is online`)
	})
}
