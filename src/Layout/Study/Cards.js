import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";

export const Card = ({ cards }) => {
  const [side, setSide] = useState(true);
  const [card, setCard] = useState(0);
  const history = useHistory();
  const { deckId } = useParams();
  // const { deckId } = useParams();
  //when I click the button it should flip the card to back
  //It takes in a bunch of cards and displays them one at a time
  // const singleCard = cards.map((card) => (
  //   <span key={card.id}>{card.front}</span>
  // ));
  const nextHandler = () => {
    if (card === cards.length - 1) {
      window.confirm(
        "Click OK to restart the deck, or CANCEL to return to the homepage."
      )
        ? setCard(() => 0)
        : history.push("/");
    }
  };
  // const currentCard = cards[0];
  const clickHandlerFlip = () => {
    setSide(() => !side);
  };

  return (
    <span>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">
            Card {card + 1} of {cards.length}
          </h5>
          <p className="card-text">
            {side ? cards[card].front : cards[card].back}
          </p>
          <button onClick={clickHandlerFlip} className="btn btn-secondary">
            Flip
          </button>
        </div>
      </div>
    </span>
  );
};

export default Card;
