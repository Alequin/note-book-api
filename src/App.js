import React from "react";
import { createGlobalStyle } from "styled-components";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { FlashCard } from "./components/flash-card/flash-card";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }`;

export const App = () => (
  <BrowserRouter>
    <main>
      <Switch>
        <Route path="/" component={FlashCard} exact />
      </Switch>
      <GlobalStyle />
    </main>
  </BrowserRouter>
);
