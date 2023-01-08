import "./App.css";
// import dependencies
import { useState } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Container, CssBaseline, Grid } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
//import utils
import Auth from "./utils/auth";
// import pages
import Home from "./pages/Home";
import Login from "./pages/Login";
// import components
import Header from "./components/Header";
import Footer from "./components/Footer";
// apollo client init
const httpLink = createHttpLink({
  uri: "/graphql",
});
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
// MUI theme settings
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ea80fc",
    },
    secondary: {
      main: "#a135e0",
    },
  },
});
function App() {
  const [isLoggedIn, setLoggedIn] = useState(Auth.isTokenExpired());
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Grid
          container
          height="100vh"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Header />
          <CssBaseline />
          {isLoggedIn ? (
            <Home setLoggedIn={setLoggedIn} />
          ) : (
            <Login setLoggedIn={setLoggedIn} />
          )}
          <Footer />
        </Grid>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
