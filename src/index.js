'use strict';

require('dotenv').config();
require('./config')
const pairs  = require('./routes/pairs');
const Hapi = require('@hapi/hapi');
const Joi = require("@hapi/joi")


const port = process.env.PORT
const host = process.env.HOST

const init = async () => {
    const server = new Hapi.server({
        port,
        host
    });
    
    await server.register(require('./doc'))

    try {
        await server.start();
        console.log('Server running at:', server.info.uri);
    } catch(err) {
        console.log(err);
    }

    server.route(pairs);

};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();