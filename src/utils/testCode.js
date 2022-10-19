import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export const Card = ({ cards }) => {
  const [side, setSide] = useState(true);
  const [card, setCard] = useState(0);

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

  // const currentCard = cards[0];
  const clickHandlerFlip = () => {
    setSide(() => !side);
  };

  const content = side ? cards[card].front : cards[card].back;

  if (cards.length > 2) {
    return (
      <div className="row p-3">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">
              Card {card + 1} of {cards.length}
            </h5>
            <p className="card-text">{content}</p>
            <button onClick={clickHandlerFlip} className="btn btn-secondary">
              Flip
            </button>
            {side ? null : (
              <button onClick={nextHandler} className="btn btn-primary">
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default Card;
