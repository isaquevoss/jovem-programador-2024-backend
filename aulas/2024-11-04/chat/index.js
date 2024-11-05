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

app.get('/users', async (req, res) => {
    res.json( users );
});
const users = [];
io.on('connection', (socket) => {
    console.log('a user connected with id: ', socket.id);
    users.push({
        id: socket.id,
        nome: socket.handshake.query.nomeUsuario
    })
    
    socket.broadcast.emit('usuario conectou', {
        id: socket.id,
        nome: socket.handshake.query.nomeUsuario,
        usuarios_ativos: users
    });
    socket.on('disconnect', () => {
        users.splice(users.indexOf(i => i.id == socket.id), 1);
        socket.broadcast.emit('usuario desconectou', {
            id: socket.id,
            nome: socket.handshake.query.nomeUsuario,
            usuarios_ativos: users
        });
    });

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