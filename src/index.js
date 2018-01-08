'use strict';

const _ = require('lodash');
const Alexa = require('alexa-sdk');
const cmcHandler = require(__dirname + '/cmc/convertedManaCostIntent');

const handlers = _.assign(
    {}, cmcHandler);

exports.handler = function (event, context, callback) {

    const alexa = Alexa.handler(event, context, callback);

    alexa.appId = config.get('app.id');

    alexa.registerHandlers(handlers);

    alexa.execute();

};

