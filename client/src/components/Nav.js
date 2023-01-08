import { BottomNavigationAction, BottomNavigation, Grid } from "@mui/material";
import { React, useState } from "react";
import ChatIcon from "@mui/icons-material/Chat";
import PeopleIcon from "@mui/icons-material/People";

function Nav({ setShowFriendPage }) {
  const [value, setValue] = useState(0);
  return (
    <Grid>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          newValue === 0 ? setShowFriendPage(false) : setShowFriendPage(true);
        }}
      >
        <BottomNavigationAction label="Chats" icon={<ChatIcon />} />
        <BottomNavigationAction label="Friends" icon={<PeopleIcon />} />
      </BottomNavigation>
    </Grid>
  );
}

export default Nav;
