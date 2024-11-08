import { io } from 'socket.io-client';




async function enviarMensagens() {
    const client = io('http://localhost:3000', {
        query: {
           
                nomeUsuario: 'Sistema'
        }
    }

    );
    await new Promise(resolve => setTimeout(resolve, 1000));
    while (true) {
        console.log('Sending message...');
        client.emit('chat message', 'Mensagem automatica do sistema enviada em ' + new Date().toLocaleString());

        await new Promise(resolve => setTimeout(resolve, 1000));
    }
}

enviarMensagens();