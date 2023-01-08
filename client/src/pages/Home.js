import { Box, Button, Grid, Paper } from "@mui/material";
import { React, useState } from "react";
import Nav from "../components/Nav";
import BorderColorSharpIcon from "@mui/icons-material/BorderColorSharp";
import FriendDash from "../components/FriendDash";
import ChatDash from "../components/ChatDash";
import { useQuery } from "@apollo/client";
import { ME } from "../utils/queries";
function Home({ setLoggedIn }) {
  const [showFriendPage, setShowFriendPage] = useState(false);
  const { loading, data: me } = useQuery(ME);
  console.log(me);
  //   determine what is to be displayed
  const getContent = () => {
    if (loading) {
      return <div>Loading...</div>;
    }
    if (showFriendPage) {
      return <FriendDash />;
    } else {
      return <ChatDash />;
    }
  };
  return (
    <Box container="true" sx={{ width: "70%", minWidth: "300px" }}>
      <Paper>
        <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            onClick={() => {
              localStorage.removeItem("id_token");
              setLoggedIn(false);
            }}
          >
            Log Out
          </Button>
          <Button>
            <BorderColorSharpIcon></BorderColorSharpIcon>
          </Button>
        </Grid>
        {getContent()}
        <Nav setShowFriendPage={setShowFriendPage} />
      </Paper>
    </Box>
  );
}

export default Home;
