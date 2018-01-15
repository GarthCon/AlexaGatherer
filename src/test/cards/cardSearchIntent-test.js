'use strict';

const sinon = require('sinon');
//const expect = require('chai').expect;
const mtg = require('mtgsdk');
const alexaTest = require('alexa-skill-test-framework');
const config = require('config');

alexaTest.initialize(
  require('../../index'),
  config.get('app.id'),
  'amzn1.ask.account.VOID',
  'amzn1.ask.device.VOID'
);

function buildIntentRequest(intent, slot) {
  const intentRequest = alexaTest.getIntentRequest(intent, slot);

  intentRequest.context.System.user = {
    userId: 'amzn1.ask.account.VOID',
    accessToken: 'MyLovelyAccessToken'
  };

  return intentRequest;
}

function buildCardForResponse(name, cmc, text, power, toughness, rarity, colors) {
  return [ {
    name: name,
    cmc: cmc,
    text: text,
    power: power,
    toughness: toughness,
    rarity: rarity,
    colors: colors,
    type: 'creature'
  }
  ];
}


describe('Card Search Intent - tests', function () {

  const sandbox = sinon.sandbox.create();

  beforeEach(() => {
    sandbox.stub(mtg.card, 'where')
      .resolves(buildCardForResponse('Grizzly Bear', 2, undefined, 2, 2, 'common', 'green'));
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('A card should be returned from mtg sdk with the correct converted mana cost', function () {

    alexaTest.test([{
      request: buildIntentRequest('ConvertedManaCostIntent', {card: 'Grizzly Bear'}),
      says: 'The converted mana cost of Grizzly Bear is 2. Would you like to know anything else?',
      shouldEndSession: false
    }]);

  }),

  describe('A card should be returned from mtg sdk with the correct power', function () {

    alexaTest.test([{
      request: buildIntentRequest('PowerIntent', {card: 'Grizzly Bear'}),
      says: 'The power of Grizzly Bear is 2. Would you like to know anything else?',
      shouldEndSession: false
    }]);

  }),

  describe('A card should be returned from mtg sdk with the correct toughness', function () {

    alexaTest.test([{
      request: buildIntentRequest('ToughnessIntent', {card: 'Grizzly Bear'}),
      says: 'The toughness of Grizzly Bear is 2. Would you like to know anything else?',
      shouldEndSession: false
    }]);

  });
});
