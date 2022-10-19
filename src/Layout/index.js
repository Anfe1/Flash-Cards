import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home/Home";
import Study from "./Study/Study.js";
import Decks from "./Decks/Decks";
import CreateDeck from "./Decks/CreateDeck";
import EditCard from "./Decks/EditCards";
import CardAdd from "./Decks/cardAdd";
import EditDecks from "./Decks/EditDecks";

function Layout() {
  const [length, setLength] = useState(0);
  const updatedDecks = (newDecks) => {
    setLength(() => length + newDecks);
  };

  return (
    <div>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact path="/">
            <Home updatedDecks={updatedDecks} length={length} />
          </Route>
          <Route path="/decks/new">
            <CreateDeck updateDecks={updatedDecks} />
          </Route>
          <Route path="/decks/:deckId" exact>
            <Decks updateDecks={updatedDecks} />
          </Route>
          <Route path="/decks/:deckId/Study">
            <Study />
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDecks updateDecks={updatedDecks} />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <CardAdd updateDecks={updatedDecks} />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard updateDecks={updatedDecks} />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Layout;
