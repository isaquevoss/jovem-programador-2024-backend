const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});
app.get('/login', (req, res) => {
    res.sendFile(join(__dirname, 'login.html'));
});

io.on('connection', (socket) => {
    console.log('a user connected with id: ',socket.id);
    console.log('query', JSON.stringify(socket.handshake.query));
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('chat message', (msg) => {
        socket.broadcast.emit('chat message', {
            msg: msg,
            id: socket.id,
            nome: socket.handshake.query.nomeUsuario
        });
    });

    socket.on('usuario digitando', (msg) => {
        socket.broadcast.emit('usuario digitando', {
            id: socket.id,
            nome: socket.handshake.query.nomeUsuario
        })
    })
});

server.listen(3000, () => {
    console.log('server running at http://localhost:3000');
});