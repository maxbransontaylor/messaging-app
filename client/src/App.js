import "./App.css";
// import dependencies
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
//import utils
import Auth from "./utils/auth";
// import pages
import Home from "./pages/Home";
import Login from "./pages/Login";
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
      main: "#f500cd",
    },
  },
});
function App() {
  const isLoggedIn = Auth.isTokenExpired();
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {isLoggedIn ? <Home /> : <Login />}
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
