'use strict';

// npm modules
const Joi = require('joi');
const Lab = require('lab');
const Code = require('code');

// application modules
const expect = Code.expect;
const lab = exports.lab = Lab.script();
const server = require('../example/server');


const handler = (response, h) => 'Success';
const validate = {
    payload: {
        input: Joi.string().min(3).max(10)
    }
};

lab.experiment('Plugin Tests -->', () => {

    lab.test('Without chowChow setting, validation.failAction is untouched', async () => {
        let routeInfo = server.lookup('/native');
        expect(routeInfo.settings.validate.failAction).to.not.be.a.function();
    });

    lab.test('With chowChowSetting routed after plugin, validation.failAction becomes function', async () => {
        let routeInfo = server.lookup('/example');
        expect(routeInfo.settings.validate.failAction).to.be.a.function();
    });

    lab.test('With chowChowSetting routed before plugin, validation.failAction becomes function', async () => {
        let routeInfo = server.lookup('/preRoute');
        expect(routeInfo.settings.validate.failAction).to.be.a.function();
    });

});

lab.experiment('Ensure Documentation Integrity -->', () => {

    let getOptions = (url) => {
        return {
            method: 'POST',
            url: url,
            payload: {
                input: 'HI'
            }
        };
    };

    lab.test('/example', async () => {
        let options = getOptions('/example')
        let response = await server.inject(options);
        expect(response.result).to.include({
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
        });
    });

    lab.test('/relish/default', async () => {
        let options = getOptions('/relish/default')
        let response = await server.inject(options);
        expect(response.result).to.include({
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
        });
    });

    lab.test('/relish/custom', async () => {
        let options = getOptions('/relish/custom')
        let response = await server.inject(options);
        expect(response.result).to.include({
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
        });
    });

    lab.test('/native', async () => {
        let options = getOptions('/native')
        let response = await server.inject(options);
        expect(response.result).to.include({
            "statusCode": 400,
            "error": "Bad Request",
            "message": "Invalid request payload input"
        });
    });

});