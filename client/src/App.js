import React from "react";
import Router from "./modules/components/Routes/Router";

import { Provider } from "react-redux";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import store from "./modules/Redux/store";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Router />
      </Provider>
    </ApolloProvider>
  );
}

export default App;
