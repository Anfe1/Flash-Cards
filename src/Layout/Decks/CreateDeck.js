import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../../utils/api/index.js";

function CreateDeck({ updatedDecks }) {
  const [newDeck, setNewDeck] = useState({ name: "", description: "" });

  // create a variable to use the useHistory() hook
  const history = useHistory();

  const changeForm = ({ target }) => {
    setNewDeck({ ...newDeck, [target.name]: target.value });
  };

  // use submitForm to create the new deck
  const submitForm = async (event) => {
    event.preventDefault();
    const response = await createDeck(newDeck);
    history.push(`/decks/${response.id}`);
    updatedDecks(1);
  };

  return (
    <div className="col-9 mx-auto">
      {/* a navigation bar that contains two links */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            {/* a link the redirects to the home page */}
            <Link to={"/"}>
              <i class="bi bi-house-door-fill"></i> Home
            </Link>
          </li>

          {/* a label for the current page that says "create deck" */}
          <li className="breadcrumb-item">Create Deck</li>
        </ol>
      </nav>

      {/* a form for the following content */}
      <form onSubmit={submitForm}>
        {/* a text input for the card deck's name */}
        <div className="form-group">
          <label>Name</label>

          <input
            type="text"
            name="name"
            value={newDeck.name}
            onChange={changeForm}
            id="name"
            className="form-control"
            placeholder="Deck Name"
          />
        </div>

        {/* a text area for the card's description */}
        <div className="form-group">
          <label>Description</label>

          <textarea
            name="description"
            value={newDeck.description}
            onChange={changeForm}
            className="form-control"
            id="description"
            placeholder="Brief description of the deck."
            rows={4}
          />
        </div>

        <Link to="/" name="cancel" className="btn btn-secondary mr-3">
          Cancel
        </Link>

        {/* a button for submitted the deck */}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateDeck;
