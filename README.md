![logo]

_Simplify registration of [Relish.js][Relish] messages._

![npm version] ![Known Vulnerabilities] ![GitHub license] ![Build Status] ![Coverage Status]

Lead Maintainer: [Robert Hernandez]

## Introduction

[Relish] provides "better error message for Hapi.js Joi validation." 

However, in large scale applications managing the individual route [validate] [failAction] functions custom messages can become tedious. Even though a common object may be defined in the hapi server's route configuration, this only facilitates common messages. 

For example, if you need to have a option which is required on one route but optional on another, it is difficult to change the custom message.

## Problem Example

```js
    server.route({
        method: 'POST',
        path: '/relish/custom',
        options: {
            validate: {
                payload: {
                    input: Joi.string().min(3).max(10)
                },
                /// this is a bulky statement since it is a function call then a pointer to a function.
                failAction: Relish({
                    messages: {
                        input: 'input is required and must be between 3 and 10 characters in length'
                    }
                }).failAction
            },
            handler: handler
        }
    });
```

## Solution Example

```js
    server.route({
        method: 'POST',
        path: '/example',
        options: {
            validate: {
                payload: {
                    input: Joi.string().min(3).max(10)
                }
            },
            // hapi standard plugin syntax
            plugins: {
                chowChow: {
                    input: 'input is required and must be between 3 and 10 characters in length'
                }
            },
            handler: handler
        }
    });
```

## Getting Started

### Installation

    npm install @condiments/chow-chow

### Bootsrapping in hapi server

```js
const server = new Hapi.Server({
    port: 3000,
    host: 'localhost'
});


const init = async () => {
    await server.register(require('@condiments/chow-chow'));
    // register routes
};

init();
```

## Example Outputs

### Example chow-chow

#### Request
    curl http://localhost:3000/example -H "Content-Type: application/json" -d "{\"input\":\"HI\"}"

#### Response

```json
{
    "statusCode": 400,
    "error": "Bad Request",
    "message": "input is required and must be between 3 and 10 characters in length",
    "validation": {
        "source": "payload",
        "errors": [
            {
                "key": "input",
                "path": "input",
                "message": "input is required and must be between 3 and 10 characters in length",
                "type": "string",
                "constraint": "min"
            }
        ]
    }
}
```

### Default Relish

#### Request
    curl http://localhost:3000/relish/default -H "Content-Type: application/json" -d "{\"input\":\"HI\"}"

#### Response

```json
{
    "statusCode": 400,
    "error": "Bad Request",
    "message": "\"input\" length must be at least 3 characters long",
    "validation": {
        "source": "payload",
        "errors": [
            {
                "key": "input",
                "path": "input",
                "message": "\"input\" length must be at least 3 characters long",
                "type": "string",
                "constraint": "min"
            }
        ]
    }
}
```

### Custom Relish

#### Request
    curl http://localhost:3000/relish/custom -H "Content-Type: application/json" -d "{\"input\":\"HI\"}"

#### Response

```json
{
    "statusCode": 400,
    "error": "Bad Request",
    "message": "input is required and must be between 3 and 10 characters in length",
    "validation": {
        "source": "payload",
        "errors": [
            {
                "key": "input",
                "path": "input",
                "message": "input is required and must be between 3 and 10 characters in length",
                "type": "string",
                "constraint": "min"
            }
        ]
    }
}
```

### Native hapi

#### Request
    curl http://localhost:3000/native -H "Content-Type: application/json" -d "{\"input\":\"HI\"}"

#### Response

```json
{
    "statusCode": 400,
    "error": "Bad Request",
    "message": "Invalid request payload input"
}
```


[Relish]: https://github.com/dialexa/relish
[hapi]: https://hapi.dev/
[joi]: https://github.com/hapijs/joi
[failAction]: https://hapi.dev/api/?v=18.4.0#-routeoptionsvalidatefailaction
[validate]: https://hapi.dev/api/?v=18.4.0#-routeoptionsvalidate
[Robert Hernandez]: https://github.com/gentleman-turk
[logo]:https://github.com/gentleman-turk/chow-chow/raw/master/images/logo.png
[npm version]: https://badge.fury.io/js/%40condiments%2chow-chow.svg "https://badge.fury.io/js/%40condiments%2chow-chow"
[Known Vulnerabilities]: https://snyk.io/test/github/gentleman-turk/chow-chow/badge.svg "https://snyk.io/test/github/gentleman-turk/chow-chow"
[GitHub license]: https://img.shields.io/badge/license-ISC-blue.svg "https://github.com/gentleman-turk/chow-chow/blob/master/LICENSE"
[Build Status]: https://travis-ci.org/gentleman-turk/chow-chow.svg?branch=master "https://travis-ci.org/gentleman-turk/chow-chow"
[Coverage Status]: https://coveralls.io/repos/github/gentleman-turk/chow-chow/badge.svg?branch=master "https://coveralls.io/github/gentleman-turk/chow-chow?branch=master"