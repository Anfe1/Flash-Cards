import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import { listDecks } from "../../utils/api";
import DeckList from "../Decks/DeckList.js";

// DeckList will visualize the decks into the home page.
const Home = () => {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const loadDecks = async () => {
      const response = await listDecks(abortController.signal);
      setDecks(() => response);
    };

    loadDecks();
    return () => abortController.abort();
  }, []);

  return (
    <div>
      <div className="row mx-auto">
        <Link to={"/decks/new"} className="btn btn-secondary mb-2">
          <i className="bi-plus-lg"></i>
          Create Deck
        </Link>
      </div>
      {/* iterate through my loaded decks, into deckList */}
      <div className="row mx-auto">
        {decks.map((deck) => (
          <DeckList key={deck.id} deck={deck} />
        ))}
      </div>
    </div>
  );
};

export default Home;
