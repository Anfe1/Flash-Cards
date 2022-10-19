import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { listDecks } from "../../utils/api";
import DeckList from "../Decks/DeckList.js";

// DeckList will visualize the decks into the home page.
const Home = ({ updatedDecks, length }) => {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const loadDecks = async () => {
      const response = await listDecks(abortController.signal);
      setDecks(() => response);
    };

    loadDecks();
    return () => abortController.abort();
  }, [length]);

  return (
    <div>
      <div className="row mx-auto">
        <Link to={"/decks/new"} className="btn btn-secondary mb-2">
          <i className="bi-plus-lg"></i>
          <span> Create Deck</span>
        </Link>
      </div>
      {/* iterate through my loaded decks, into deckList */}
      <div className="row mx-auto">
        {decks.map((deck) => (
          <DeckList key={deck.id} deck={deck} updatedDecks={updatedDecks} />
        ))}
      </div>
    </div>
  );
};

export default Home;
