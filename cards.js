const createDeck = () => {
  const suits = ['\u2664', '\u2665', '\u2666', '\u2663'];
  const ranks = ['a', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  return [].concat(...ranks.map((card) => suits.map((suit) => `${card}${suit}`)));
}

const shuffle = (deck) => {
  let shuffledDeck = deck.slice();
  for (let i = shuffledDeck.length - 1; i > 0; i--) {
    const rand = Math.floor(Math.random() * (i + 1));
    [shuffledDeck[i], shuffledDeck[rand]] = [shuffledDeck[rand], shuffledDeck[i]];
  }
  return shuffledDeck;
};

const dealCard = (deck) => deck.shift();

const deal = (deck, hands, perHand) => {
  if (hands * perHand > 52) throw new Error('too many hands, not enough cards!');
  const returnHands = [];
  for (let i = 0; i < hands; i++) {
    if (returnHands.length === i) returnHands.push([]);
    for (let j = 0; j < perHand; j++) {
      returnHands[i].push(dealCard(deck));
    }
  }
  return returnHands;
}

console.log(deal(shuffle(createDeck()), 3, 2));
