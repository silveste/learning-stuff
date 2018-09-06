import React, { Component } from 'react';
import shuffle from 'shuffle-array';
import Navbar from './Navbar';
import Card from './Card';

const CardState = {
  HIDDING: 0, //Hidden card
  SHOWING: 1, //Visible Card
  MATCHING: 2 //Visible and Mathing. it should be a final state (Never go back to other state in the game)
};



class MemoryGame extends Component {
  constructor(props) {
    super(props);
    //Cards colors are fixed
    let cards = [
      {id: 0, cardState: CardState.HIDDING, backgroundColor: 'red'},
      {id: 1, cardState: CardState.HIDDING, backgroundColor: 'red'},
      {id: 2, cardState: CardState.HIDDING, backgroundColor: 'green'},
      {id: 3, cardState: CardState.HIDDING, backgroundColor: 'green'},
      {id: 4, cardState: CardState.HIDDING, backgroundColor: 'purple'},
      {id: 5, cardState: CardState.HIDDING, backgroundColor: 'purple'},
      {id: 6, cardState: CardState.HIDDING, backgroundColor: 'blue'},
      {id: 7, cardState: CardState.HIDDING, backgroundColor: 'blue'},
      {id: 8, cardState: CardState.HIDDING, backgroundColor: 'pink'},
      {id: 9, cardState: CardState.HIDDING, backgroundColor: 'pink'},
      {id: 10, cardState: CardState.HIDDING, backgroundColor: 'turquoise'},
      {id: 11, cardState: CardState.HIDDING, backgroundColor: 'turquoise'},
      {id: 12, cardState: CardState.HIDDING, backgroundColor: 'yellow'},
      {id: 13, cardState: CardState.HIDDING, backgroundColor: 'yellow'},
      {id: 14, cardState: CardState.HIDDING, backgroundColor: 'white'},
      {id: 15, cardState: CardState.HIDDING, backgroundColor: 'white'}
    ];

    cards = shuffle(cards);

    this.state = {cards, noClick: false};

    this.handleClick = this.handleClick.bind(this);
    this.handleNewGame = this.handleNewGame.bind(this);
  }

  handleNewGame() {
    let cards = this.state.cards.map(card => ({
      ...card,
      cardState: CardState.HIDDING
    }));
    cards = shuffle(cards);
    this.setState({cards});
  }

  handleClick(id) {
    const mapCardState = (cards, idsToChange, newCardState) => {
      return cards.map(card => {
        if (idsToChange.includes(card.id)) {
          return {
            ...card,
            cardState: newCardState
          };
        }
        return card;
      });
    };

    const foundCard = this.state.cards.find(card => card.id === id);

    if (this.state.noClick || foundCard.cardState !== CardState.HIDDING) {
      return;
    }

    let noClick = false;
    let cards = mapCardState(this.state.cards, [id], CardState.SHOWING);
    const showingCards = cards.filter(card => card.cardState === CardState.SHOWING);
    const ids = showingCards.map(card => card.id);
    if (showingCards.length === 2 &&
      showingCards[0].backgroundColor === showingCards[1].backgroundColor){
      cards = mapCardState(cards, ids, CardState.MATCHING);
    } else if (showingCards.length === 2) {
      let hiddingCards = mapCardState(cards, ids, CardState.HIDDING);
      noClick = true;
      this.setState({cards, noClick}, ()=> {
        setTimeout(() => {
          this.setState({cards: hiddingCards, noClick: false});
        },1500);
      });
      return;
    }
    this.setState({cards, noClick});
  }

  render() {
    const cards = this.state.cards.map((card) => (
      <Card
        key={card.id}
        backgroundColor={card.backgroundColor}
        showing={card.cardState !== CardState.HIDDING}
        onClick={() => this.handleClick(card.id)}
      />
    ));
    return (
      <div>
        <Navbar onNewGame={this.handleNewGame}/>
        {cards}
      </div>
    );
  }
}

export default MemoryGame;
