'use strict';

const mtg = require('mtgsdk');
const reprompt = 'what do you want to know about another card?';
const fail = 'The requested card could not be found, what else do you want to know?';

function getCard(cardSlot) {

  console.info('About to search for cardname: ' + cardSlot.value);

  return mtg.card.where({ name: cardSlot.value })
    .then((cards) => {
      console.info('Found ' + cards.length + 'cards');
      if (cards.length > 10) {
        return (cards[0]);
      } else {
        for (var i = 0; i < cards.length; i++) {
          if (cardSlot.value.toLowerCase() === cards[i].name.toLowerCase()) {
            return cards[i];
          }
        }
      }
    });
}

module.exports = {
  ConvertedManaCostIntent() {
    const self = this;

    return getCard(this.event.request.intent.slots.card).then((card) => {
      if (!card) {
        console.info('no card');
        self.emit(':ask', fail, reprompt);
        return;
      }

      console.info('card: ' + card.cmc);
      self.emit(':ask', 'The converted mana cost of ' + card.name + ' is ' + card.cmc, reprompt);
    });
  },
  PowerIntent() {
    const self = this;

    return getCard(this.event.request.intent.slots.card).then((card) => {
      if (!card) {
        console.info('no card');
        self.emit(':ask', fail, reprompt);
        return;
      }

      console.info('card: ' + card.cmc);
      self.emit(':ask', 'The power of ' + card.name + ' is ' + card.power, reprompt);
    });
  },
  ToughnessIntent() {
    const self = this;

    return getCard(this.event.request.intent.slots.card).then((card) => {
      if (!card) {
        console.info('no card');
        self.emit(':ask', fail, reprompt);
        return;
      }

      console.info('card: ' + card.cmc);
      self.emit(':ask', 'The toughness of ' + card.name + ' is ' + card.toughness, reprompt);
    });
  },
  TypeIntent() {
    const self = this;

    return getCard(this.event.request.intent.slots.card).then((card) => {
      if (!card) {
        console.info('no card');
        self.emit(':ask', fail, reprompt);
        return;
      }

      console.info('card: ' + card.cmc);
      self.emit(':ask', 'The type of ' + card.name + ' is ' + card.type, reprompt);
    });
  },
  RarityIntent() {
    const self = this;

    return getCard(this.event.request.intent.slots.card).then((card) => {
      if (!card) {
        console.info('no card');
        self.emit(':ask', fail, reprompt);
        return;
      }

      console.info('card: ' + card.cmc);
      self.emit(':ask', 'The rarity of ' + card.name + ' is ' + card.rarity, reprompt);
    });
  },
  InfoIntent() {
    const self = this;

    return getCard(this.event.request.intent.slots.card).then((card) => {
      if (!card) {
        console.info('no card');
        self.emit(':ask', fail, reprompt);
        return;
      }
      console.info('card: ' + card.cmc);
      if(card.type.toLowerCase() === 'creature') {
      self.emit(':ask', card.name + ' is a ' + card.cmc + ' cost ' + card.color + ' ' + card.type + 
      '. It has ' + card.toughness + ' toughness and ' + card.power + ' power and says ' + card.text, reprompt);
      } else {
        self.emit(':ask', card.name + ' is a ' + card.cmc + ' cost ' + card.color + ' ' + card.type + 
        '. It says ' + card.text, reprompt);
      }
    });
  }
};
