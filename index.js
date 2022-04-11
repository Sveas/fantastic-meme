
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

var innskráðir = 0;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    innskráðir++;
    io.emit('innskráðir_breyttust', innskráðir);
    socket.on('disconnect', () => {
        console.log('user disconnected');
        innskráðir--;
        io.emit('innskráðir_breyttust', innskráðir);
    });
    socket.on('choose_username', (username) => {
        socket.userName = username;
    });
    socket.on('chat message', (msg) => {        
        console.log('message: ' + msg);
        io.emit('chat message', socket.userName, msg);
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});



