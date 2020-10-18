import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { FlashCardList } from "./flash-card-list";

export const App = () => (
  <BrowserRouter>
    <main>
      <Switch>
        <Route path="/" component={FlashCardList} exact />
      </Switch>
    </main>
  </BrowserRouter>
);
