import { Switch, Route } from "wouter";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import HomePage from "./pages/HomePage";
import { Toaster } from "@/components/ui/toaster";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: "Bearer 54321-this-is-secret-token",
    }
  }
});

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <Switch>
        <Route path="/" component={HomePage} />
      </Switch>
      <Toaster />
    </ApolloProvider>
  );
}

export default App;