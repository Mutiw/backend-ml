'use strict';

const Hapi = require('@hapi/hapi');
const { routes } = require('./routes');
const { loadModel } = require('./loadModel');

const init = async () => {
    const server = Hapi.server({
        port: process.env.PORT || 8080,
        host: '0.0.0.0'
    });

    server.route(routes);

    await loadModel(); // Load model on startup

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
