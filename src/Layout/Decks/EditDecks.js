import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, updateDeck } from "../../utils/api/index.js";

function EditDeck({ updatedDecks }) {
  const [deck, editDeck] = useState({ name: "", description: "" });
  const history = useHistory();
  const { deckId } = useParams();

  useEffect(() => {
    const abortController = new AbortController();
    const deckInfo = async () => {
      const response = await readDeck(deckId, abortController.signal);
      editDeck(() => response);
    };

    deckInfo();
    return () => abortController.abort();
  }, [deckId]);

  const changeForm = ({ target }) => {
    editDeck({ ...deck, [target.name]: target.value });
  };

  const submitForm = async (event) => {
    event.preventDefault();
    const response = await updateDeck(deck);
    history.push(`/decks/${response.id}`);
    updatedDecks(1);
  };

  if (!deck) {
    return (
      <div className="spinner-border text-primary">
        <span className="sr-only">Loading...</span>
      </div>
    );
  } else {
    return (
      <div className="col-9 mx-auto">
        {/* navigation bar */}
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
            <li className="breadcrumb-item">Edit Deck</li>
          </ol>
        </nav>
        <div className="row pl-3 pb-2">
          <h1>Edit Deck</h1>
        </div>
        {/* name box */}
        <form onSubmit={submitForm}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={deck.name}
              onChange={changeForm}
              id="name"
              className="form-control"
              placeholder={deck.name}
            />
          </div>
          {/* description box */}
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={deck.description}
              onChange={changeForm}
              className="form-control"
              id="description"
              placeholder={deck.description}
              rows={4}
            />
          </div>
          {/* cancel button */}
          <Link
            to={`/decks/${deckId}`}
            name="cancel"
            className="btn btn-secondary mr-3"
          >
            Cancel
          </Link>

          {/* submit button */}
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default EditDeck;
