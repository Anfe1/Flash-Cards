import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { updateCard, readDeck, readCard } from "../../utils/api/index.js";
import CardForm from "./CardForm.js";

function EditCard({ updatedDecks }) {
  const { deckId, cardId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState([]);
  const [card, editCard] = useState({ front: "", back: "", deckId: "" });

  useEffect(() => {
    // const abortController = window.AbortController;
    const abortController = new AbortController();
    const cardInfo = async () => {
      const response = await readCard(cardId, abortController.signal);
      editCard(() => response);
    };
    cardInfo();
    return () => abortController.abort();
  }, [cardId]);

  useEffect(() => {
    const abortController = new AbortController();

    const deckInfo = async () => {
      const response = await readDeck(deckId, abortController.signal);
      setDeck(() => response);
    };

    deckInfo();
    return () => abortController.abort();
  }, [deckId]);

  const changeForm = ({ target }) => {
    editCard({ ...card, [target.name]: target.value });
  };

  const submitForm = async (event) => {
    event.preventDefault();
    await updateCard(card);
    history.push(`/decks/${deck.id}`);
    updatedDecks(1);
  };

  return (
    <div className="col-9 mx-auto">
      {/* navigation bar */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            {/* link to home page */}
            <Link to={"/"}>
              <i class="bi bi-house-door-fill"></i> Home
            </Link>
          </li>

          {/* deck name */}
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>

          {/* edit card */}
          <li className="breadcrumb-item">Edit Card {cardId}</li>
        </ol>
      </nav>

      <div className="row pl-3 pb-2">
        <h1>Edit Card</h1>
      </div>
      <CardForm
        formSubmit={submitForm}
        cardChangeForm={changeForm}
        card={card}
        deckId={deckId}
      />
    </div>
  );
}

export default EditCard;
