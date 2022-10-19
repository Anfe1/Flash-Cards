import React, { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";

const Card = ({ cards }) => {
  const [side, setSide] = useState(true);
  const [card, setCard] = useState(0);
  const { deckId } = useParams();
  const history = useHistory();

  const nextHandler = () => {
    if (card === cards.length - 1) {
      window.confirm(
        "Click OK to restart the deck, or CANCEL to return to the homepage."
      )
        ? setCard(() => 0)
        : history.push("/");
    } else {
      setCard((card) => card + 1);
      setSide(() => !side);
    }
  };

  const flipHandler = () => {
    setSide(() => !side);
  };

  if (cards.length > 2) {
    return (
      <div className="card w-100">
        <div className="card-body">
          <h5 className="card-title">
            Card {card + 1} of {cards.length}
          </h5>
          <p className="body">{side ? cards[card].front : cards[card].back}</p>
          <button onClick={flipHandler} className="btn btn-secondary mr-3">
            Flip
          </button>
          {side ? null : (
            <button onClick={nextHandler} className="btn btn-primary">
              Next
            </button>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className="row p-3 w-100">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Not enough cards.</h5>
            <p className="card-text">
              You need at least 3 cards to study. There are {cards.length} cards
              in this deck.
            </p>
            <Link
              to={`/decks/${deckId}/cards/new`}
              className="btn btn-primary mx-auto"
            >
              Add Cards
            </Link>
          </div>
        </div>
      </div>
    );
  }
};

export default Card;
