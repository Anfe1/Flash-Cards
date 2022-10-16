import React from "react";
import { Link } from "react-router-dom";

export const DeckList = ({ deck }) => {
  const { id, name, description, cards } = deck;
  const deckLength = cards.length;

  //creates the deck component that represent the specific id
  return (
    <div className="card w-75 mb-4">
      <div className="card-body">
        <div className="row px-3">
          <h5 className="card-title">{name}</h5>
          <p className="ml-auto">{deckLength} cards</p>
        </div>
        <p className="card-text">{description}</p>
        <div>
          <Link to={`/decks/${id}`} className="btn btn-secondary mr-2">
            <i className=" mr-1 bi bi-eye"></i>
            View
          </Link>

          <Link to={`/decks/${id}/study`} className="btn btn-primary mi-3 mr-2">
            <i className="mr-1 bi bi-journal-bookmark"></i>
            Study
          </Link>

          <button name="delete" value={id} className="btn btn-danger ml-auto">
            <i className="bi bi-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeckList;
