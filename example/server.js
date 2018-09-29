'use strict';
/* $lab:coverage:off$ */
const Hapi = require('hapi');
const Joi = require('joi');
const Relish = require('relish');


// initialize the Hapi Server instance
const server = new Hapi.Server({
    port: 3000,
    host: 'localhost'
});

const handler = async (request, h) => "Succss!";

server.route({
    method: 'POST',
    path: '/preRoute',
    options: {
        id: '/preRoute',
        validate: {
            payload: {
                input: Joi.string().min(3).max(10)
            }
        },
        plugins: {
            chowChow: {
                input: 'input is required and must be between 3 and 10 characters in length'
            }
        },
        handler: handler
    }
});

const init = async () => {
    await server.register(require('../index'));

    server.route({
        method: 'POST',
        path: '/example',
        options: {
            id: '/example',
            validate: {
                payload: {
                    input: Joi.string().min(3).max(10)
                }
            },
            plugins: {
                chowChow: {
                    input: 'input is required and must be between 3 and 10 characters in length'
                }
            },
            handler: handler
        }
    });

    server.route({
        method: 'POST',
        path: '/example/coexist',
        options: {
            id: '/example/coexist',
            validate: {
                payload: {
                    input: Joi.string().min(3).max(10)
                },
                failAction: Relish().failAction
            },
            plugins: {
                chowChow: {
                    input: 'input is required and must be between 3 and 10 characters in length'
                }
            },
            handler: handler
        }
    });

    server.route({
        method: 'POST',
        path: '/relish/custom',
        options: {
            id: '/relish/custom',
            validate: {
                payload: {
                    input: Joi.string().min(3).max(10)
                },
                failAction: Relish({
                    messages: {
                        input: 'input is required and must be between 3 and 10 characters in length'
                    }
                }).failAction
            },
            handler: handler
        }
    });

    server.route({
        method: 'POST',
        path: '/relish/default',
        options: {
            id: '/relish/default',
            validate: {
                payload: {
                    input: Joi.string().min(3).max(10)
                },
                failAction: Relish().failAction
            },
            handler: handler
        }
    });

    server.route({
        method: 'POST',
        path: '/native',
        options: {
            id: '/native',
            validate: {
                payload: {
                    input: Joi.string().min(3).max(10)
                }
            },
            handler: handler
        }
    });

    await server.start();
    console.info(`Server running at: ${server.info.uri}`);
};

init();

// used for testing
module.exports = server;

/* $lab:coverage:on$ */
