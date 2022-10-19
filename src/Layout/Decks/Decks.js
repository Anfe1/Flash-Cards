import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory, useRouteMatch } from "react-router-dom";
import { deleteCard, readDeck, deleteDeck } from "../../utils/api/index.js";

const Deck = ({ updateDecks }) => {
  const [deck, setDeck] = useState([]);
  const { deckId } = useParams();
  const history = useHistory();
  const { url } = useRouteMatch();
  const { id, name, description, cards } = deck;

  useEffect(() => {
    const abortController = new AbortController();
    const loadDeck = async () => {
      const response = await readDeck(deckId, abortController.signal);
      setDeck(() => response);
    };
    loadDeck();
    return () => abortController.abort();
  }, [deckId]);

  const deleteHandler = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete this deck? You will not be able to recover it."
      )
    ) {
      await deleteDeck(id);
      updateDecks(-1);
      history.push("/");
    } else {
      history.go(0);
    }
  };

  if (!deck || !cards) {
    return (
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  } else {
    return (
      <div className="col-9 mx-auto">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            {/* Homepage */}
            <li className="breadcrumb-item">
              <Link to={"/"}>
                <i class="bi bi-house-door-fill"></i> Home
              </Link>
            </li>
            <li className="breadcrumb-item">{name}</li>
          </ol>
        </nav>

        <div className="card border-0 mb-4">
          <div className="card-body">
            <div className="row px-3">
              <h5 className="card-title">{name}</h5>
            </div>

            <p className="card-text">{description}</p>

            <div className="row px-3">
              {/* edit button */}
              <Link to={`/decks/${id}/edit`} className="btn btn-secondary">
                <i className="bi bi-pencil"></i>
                <span> Edit</span>
              </Link>

              {/* study button */}
              <Link to={`/decks/${id}/study`} className="btn btn-primary ml-2">
                <i className="bi bi-journal-bookmark"></i>
                <span> Study</span>
              </Link>

              {/* add cards button */}
              <Link
                to={`/decks/${id}/cards/new`}
                className="btn btn-primary ml-2"
              >
                <i className="bi-plus-lg"></i>
                <span> Add Card</span>
              </Link>

              {/* delete button */}
              <button
                onClick={deleteHandler}
                name="delete"
                value={id}
                className="btn btn-danger ml-auto"
              >
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="row pl-3 pb-2">
          <h1>Cards</h1>
        </div>

        {cards.map((card, index) => (
          <div className="row" key={index}>
            <div className="col">
              <div className="card">
                <div className="row card-body">
                  {/* front */}
                  <p className="col-6 card-text">{card.front}</p>

                  {/* back */}
                  <p className="col-6 card-text">{card.back}</p>
                </div>

                <div className="d-flex justify-content-end p-2">
                  {/* edit button */}
                  <Link
                    to={`${url}/cards/${card.id}/edit`}
                    className="btn btn-secondary"
                  >
                    <i className="bi bi-pencil"></i>
                    <span> Edit</span>
                  </Link>

                  <button
                    onClick={async () => {
                      if (
                        window.confirm(
                          "Are you sure you want to delete this card? You will not be able to recover it."
                        )
                      ) {
                        await deleteCard(card.id);
                        updateDecks(-1);
                        history.go(0);
                      } else {
                        history.go(0);
                      }
                    }}
                    name="deleteCard"
                    value={card.id}
                    className="btn btn-danger ml-2"
                  >
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
};

export default Deck;
