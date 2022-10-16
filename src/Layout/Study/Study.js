import React, { useEffect, useState } from "react";
import { readDeck } from "../../utils/api/index.js";
import { useParams } from "react-router-dom";

import Card from "./Cards";

export const Study = () => {
  const [deck, setDeck] = useState([]);
  const { deckId } = useParams();

  useEffect(() => {
    const abortController = new AbortController();
    const loadDeck = async () => {
      const response = await readDeck(deckId, abortController.signal);
      setDeck(() => response);
    };
    loadDeck();
    return () => abortController.abort();
  }, []);
  //Still need breadcrums

  return (
    <div>
      <h1>Study: {deck.name}</h1>
      <span>
        <Card cards={deck.cards} />
      </span>
    </div>
  );
};

export default Study;
