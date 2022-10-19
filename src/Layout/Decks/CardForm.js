import React from "react";
import { Link } from "react-router-dom";

function CardForm({ formSubmit, cardChangeForm, card, deckId }) {
  return (
    <form id="cardForm" onSubmit={formSubmit}>
      <div>
        <label>Front</label>
        <textarea
          name="front"
          value={card.front}
          onChange={cardChangeForm}
          id="front"
          className="form-control mb-3"
          placeholder="Front side of card"
          rows={2}
        />

        <label>Back</label>
        <textarea
          name="back"
          value={card.back}
          onChange={cardChangeForm}
          id="back"
          className="form-control mb-3"
          placeholder="Back side of card"
          rows={2}
        />
        <Link to={`/decks/${deckId}`} className="btn btn-secondary mr-2">
          Done
        </Link>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </div>
    </form>
  );
}

export default CardForm;
