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
  const { loading, data } = useQuery(ME);
  const me = data?.me;
  //   determine what is to be displayed
  const getContent = () => {
    if (loading) {
      return <div>Loading...</div>;
    }
    if (showFriendPage) {
      return <FriendDash me={me?._id} friends={me?.friends} />;
    } else {
      return <ChatDash />;
    }
  };
  return (
    <Paper>
      <Box
        sx={{
          width: "inherit",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
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
        </Box>
        <Box sx={{ flexGrow: 1 }}>{getContent()}</Box>
        <Nav setShowFriendPage={setShowFriendPage} />
      </Box>
    </Paper>
  );
}

export default Home;
