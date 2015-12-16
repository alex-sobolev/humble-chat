'use strict';

let net = require('net');

let colors = require('colors');

let clients = [];

net.createServer((socket) => {
    clients.push(socket);
    console.log('Someone has just connected' +
        socket.remoteAddress + ': ' + socket.remotePort);

    socket.on('readable', () => {
        let chunk = socket.read();
        if(chunk == null) {
            return;
        }
        console.log(chunk.toString('utf-8'));
        clients.forEach((it) => {
            it.write(chunk);
        });
    });

    socket.on('error', () => {
        console.log('Disconnected forcefully' .red);
        removeSocket(socket);
    });

        function removeSocket (socket) {
            let socketIndex = clients.indexOf(socket);
            clients.splice(socketIndex, 1);
        }

}).listen(7171);

console.log('Server is listening on port 7171');
