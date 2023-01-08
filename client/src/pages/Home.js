import { Box, Button, Grid, Paper } from "@mui/material";
import { React } from "react";

function Home({ setLoggedIn }) {
  return (
    <Box sx={{ width: "50%" }}>
      <Paper>
        <Button
          onClick={() => {
            localStorage.removeItem("id_token");
            setLoggedIn(false);
          }}
        >
          Log Out
        </Button>
      </Paper>
    </Box>
  );
}

export default Home;
