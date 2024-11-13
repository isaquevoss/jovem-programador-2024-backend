import { Server } from 'socket.io';
import express from 'express';
import { createServer } from 'http';

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer);

app.use(express.static('public'));

const usuarios = [];

io.on('connection', (socket) => {
    console.log('a user connected');
    usuarios.push({
        id: socket.id,
        nomeUsuario: socket.handshake.query.nomeUsuario
    });

    socket.broadcast.emit('usuarios', usuarios);

    socket.on('disconnect', () => {
        console.log('user disconnected');
        socket.broadcast.emit('usuarios', usuarios);
        usuarios.splice(usuarios.findIndex((usuario) => usuario.id === socket.id), 1);
    });

    socket.on('chat message', (msg) => {
        socket.broadcast.emit('chat message', {
            msg: msg,
            id: socket.id,
            nomeUsuario: socket.handshake.query.nomeUsuario
        });
    });
    socket.on('mensagem particular', (e) => {
        console.log(`Mensagem particular: ${e.msg}`);
        io.to('admin').emit('mensagem particular', {
            msg: e.msg,
            id: socket.id,
            nomeUsuario: socket.handshake.query.nomeUsuario
        });

        io.to(e.id).emit('chat message', {
            msg: e.msg,
            id: socket.id,
            nomeUsuario: socket.handshake.query.nomeUsuario
        });
    });

    socket.on('digitando', (msg) => {
        console.log(`Usuário ${msg.nomeUsuario} está digitando: ${msg.digitando}`);
        io.to('admin').emit('digitando', {
            msg: msg,
            id: socket.id,
            nomeUsuario: socket.handshake.query.nomeUsuario
        });
        socket.broadcast.emit('digitando', {
            id: socket.id,
            nomeUsuario: socket.handshake.query.nomeUsuario
        });
    });

});

httpServer.listen(3000, () => {
    console.log('listening on *:3000');
});

