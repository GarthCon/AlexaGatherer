'use strict';

var mtg = require('mtgsdk');
const reprompt = 'what do you want to know about another card?';
const fail = 'The requested card could not be found, what else do you want to know?';

function populateUndefinedProperties(card) {
  if (!card) {
    return card;
  }
  if (!card.colors) {
    card.colors = 'colorless';
  }
  if (!card.text) {
    card.text = 'nothing';
  }
  return card;
}

function getCard(cardSlot) {
  console.info(JSON.stringify(cardSlot));
  console.info('About to search for cardname: ' + cardSlot.value);
  return mtg.card.where({ name: cardSlot.value })
    .then((cards) => {
      var cardsString = JSON.stringify(cards);
      console.info(cardsString);
      console.info('Found ' + cards.length + ' cards');
      if (cards.length > 50) {
        return;
      } else if (cards.length > 10) {
        return populateUndefinedProperties(cards[0]);
      } else {
        for (var i = 0; i < cards.length; i++) {
          console.info(JSON.stringify(cardSlot));
          console.info(JSON.stringify(cards[i]));
          if (cardSlot.value.toLowerCase() === cards[i].name.toLowerCase()) {
            return populateUndefinedProperties(cards[i]);
          }
        }
        return populateUndefinedProperties(cards[0]);
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
      self.emit(':ask', 'The converted mana cost of ' + card.name + ' is ' + card.cmc +
      '. Would you like to know anything else?', reprompt);
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
      if (card.type.toLowerCase().includes('creature')) {
        self.emit(':ask', 'The power of ' + card.name + ' is ' + card.power +
        '. Would you like to know anything else?', reprompt);
      } else {
        self.emit(':ask', card.name + ' is not a creature');
      }
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
      console.info('card: ' + card.toughness);
      if (card.type.toLowerCase().includes('creature')) {
        self.emit(':ask', 'The toughness of ' + card.name + ' is ' + card.toughness +
        '. Would you like to know anything else?', reprompt);
      } else {
        self.emit(':ask', card.name + ' is not a creature');
      }
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
      self.emit(':ask', 'The type of ' + card.name + ' is ' + card.type +
      '. Would you like to know anything else?', reprompt);
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
      self.emit(':ask', 'The rarity of ' + card.name + ' is ' + card.rarity +
      '. Would you like to know anything else?', reprompt);
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
      const isCreature = card.type.toLowerCase() === 'creature';
      const speechOutput = isCreature ?
        card.name + ' is a ' + card.cmc + ' cost ' + card.colors + ' ' + card.type +
        '. It has ' + card.toughness + ' toughness and ' + card.power + ' power and says ' + card.text :
        card.name + ' is a ' + card.cmc + ' cost ' + card.colors + ' ' + card.type +
        '. It says ' + card.text;
      self.emit(':ask', speechOutput, reprompt);
      // the below would work but gatherer does not use https
      // const cardTitle = card.name;
      // const image = {
      //   smallImageUrl: card.imageUrl,
      //   largeImageUrl: card.imageUrl
      // };
      // console.info('imageUrl = ' + card.imageUrl);
      // this.response.speak(speechOutput)
      //       .listen(reprompt)
      //       .cardRenderer(cardTitle, speechOutput, image);
      // this.emit(':responseReady');
    });
  }
};
