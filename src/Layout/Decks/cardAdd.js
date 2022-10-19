import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck, createCard } from "../../utils/api";
import CardForm from "./CardForm";

const CardAdd = () => {
  const [deck, setDeck] = useState([]);
  const { deckId } = useParams();
  const cardInitialState = { front: "", back: "", deckId: "" };
  const [card, setCard] = useState(cardInitialState);
  const cardChangeForm = ({ target }) => {
    setCard({ ...card, [target.name]: target.value });
  };

  useEffect(() => {
    const abortController = new AbortController();

    const loadDeck = async () => {
      const response = await readDeck(deckId, abortController.signal);
      setDeck(() => response);
    };
    loadDeck();
    return () => abortController.abort();
  }, [deckId]);

  const formSubmit = (event) => {
    event.preventDefault();
    setCard({ ...card, deckId: deckId });
    createCard(deckId, card);
    setCard({ front: "", back: "", deckId: "" });
  };

  return (
    <div className="col-9 mx-auto">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={"/"}>
              <i class="bi bi-house-door-fill"></i> Home
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}/cards/new`}>Add Card</Link>
          </li>
        </ol>
      </nav>

      <div className="row pl-3 pb-2">
        <h1>{deck.name}: Add Card</h1>
      </div>
      <CardForm
        submitForm={formSubmit}
        changeForm={cardChangeForm}
        card={card}
        deckId={deckId}
      />
    </div>
  );
};

export default CardAdd;
