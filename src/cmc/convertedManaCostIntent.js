'use strict';

const mtg = require('mtgsdk');

function getCard(cardSlot) {

  return mtg.card.find(cardSlot);
}

module.exports = {
  ConvertedManaCostIntent(directlyRoutedSlot = null) {
    const self = this;

    const card = getCard(this.event.request.intent.slots.card || directlyRoutedSlot);

    if (!card) {
      self.emit('tell:', 'The requested card could not be found');
      return;
    }

    self.emit('tell:', 'The converted mana cost of ' + card.name + ' is ' + card.cmc);

  }
};
