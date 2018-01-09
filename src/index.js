'use strict';

const _ = require('lodash');
const Alexa = require('alexa-sdk');
const cardHandler = require(__dirname + '/cards/cardSearchIntent');
const config = require('config');

const indexHandlers = {
    LaunchRequest() {
        this.emit(':ask', 'You want to know about a card?', 'What is it you would like to know?');
    },
  
    Unhandled() {
      console.info('Unhandled event called');
  
      this.emit(':tell', 'I cannot help you with that.');
    }
};

const handlers = _.assign(
    {}, indexHandlers, cardHandler);

exports.handler = function (event, context, callback) {

    const alexa = Alexa.handler(event, context, callback);

    alexa.appId = config.get('app.id');

    alexa.registerHandlers(handlers);

    alexa.execute();

};

