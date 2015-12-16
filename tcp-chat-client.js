'use strict';

let net = require('net');

let colors = require('colors');

let client = net.connect(
{
    port: 7171,
    host: '127.0.0.1'
},
    () => {
        console.log(colors.green('Someone has just connected'));
        process.stdin.pipe(client);
        client.pipe(process.stdout);
    }
);