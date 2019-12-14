import express from 'express'
import http from 'http'
import socketIo from 'socket.io'
import path from 'path'

const app = express()
const server = http.createServer(app)
const io = socketIo(server)

const onlineUsers: { [key: string]: any } = {}

app.use(express.static(path.join(__dirname, '..', '/public')))

io.on('connection', socket => {
    socket.on('new_message', (msg: any) => {
        socket.broadcast.emit('new_message', msg)
    })

    socket.on('new_user', (user: any) => {
        user.socketId = socket.id
        socket.broadcast.emit('new_user', user)
        onlineUsers[socket.id] = user
    })

    socket.on('disconnect', () => {
        socket.broadcast.emit('user_left', socket.id)
        delete onlineUsers[socket.id]
    })
})


app.get('/online-users', function (req, res) {
    res.json(Object.values(onlineUsers))
})


server.listen(3000, function () {
    console.log('listening on *:3000');
})
