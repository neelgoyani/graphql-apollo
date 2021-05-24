import React from "react";
import reactDOM from "react-dom";
import "./index.css";

import { client } from "./ApolloProvider";
import { ApolloProvider } from "@apollo/client";
import App from "./App";
import StateProvider from "./StateProvider";
import { initialState, reducer } from "./reducer";

reactDOM.render(
  <ApolloProvider client={client}>
    <StateProvider reducer={reducer} initialState={initialState}>
      <App />
    </StateProvider>
  </ApolloProvider>,
  document.getElementById("root")
);
