const http = require('http');
const cors = require('cors');
const socketIO = require('socket.io')
const express = require('express')

const app = express();
const port =  process.env.PORT || 3000

const users = [{}]

app.use(cors())

app.get('/', (req, res) => {
    res.send("its working")
})

const server = http.createServer(app)

const io = socketIO(server)

io.on("connection", (socket) => {
    console.log("New Connection")

    socket.on('joined', ({user}) => {
        users[socket.id] = user
        console.log(`${user} has joined`)
        socket.broadcast.emit('userJoined', {user : 'Admin', message : `${users[socket.id]} has joined`})
        socket.emit('welcome', {user : 'Admin', message : `welcome to the chat room ${users[socket.id]}`})
    })

    socket.on('message', ({message,id}) => {
        io.emit('sendMessage', {user : users[id], message, id})
    })
    socket.on('disconnect', () => {
        socket.broadcast.emit('leave', {user: 'Admin', message : `${users[socket.id]} has left`})
        console.log('user has left')
    })
    
})

server.listen(port, () => {
    console.log(`server is working at http://localhost:${port}`)
}) 

