import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck } from "../../utils/api/index.js";
import Card from "./Cards";

function Study() {
  const [deck, setDeck] = useState([]);
  const { deckId } = useParams();

  useEffect(() => {
    const findDeck = async () => {
      const currDeck = await readDeck(deckId);
      setDeck(() => currDeck);
    };
    findDeck();
  }, [deckId]);

  if (Object.keys(deck).length) {
    return (
      <div className="col-9 mx-auto">
        {/* navigation bar */}
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to={"/"}>Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/decks/${deckId}`}>{deck.name}</Link>
            </li>

            <li className="breadcrumb-item active">Study</li>
          </ol>
        </nav>

        {/* title */}
        <div>
          <h1>{deck.name}: Study</h1>
        </div>

        {/* card list */}
        <Card cards={deck.cards} />
      </div>
    );
  } else {
    return (
      <div className="spinner-border text-primary">
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
}

export default Study;
