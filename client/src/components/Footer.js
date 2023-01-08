import { BottomNavigationAction, BottomNavigation, Grid } from "@mui/material";
import { React, useState } from "react";
import ChatIcon from "@mui/icons-material/Chat";
import PeopleIcon from "@mui/icons-material/People";

function Footer() {
  const [value, setValue] = useState("");
  return (
    <Grid>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Chats" icon={<ChatIcon />} />
        <BottomNavigationAction label="Friends" icon={<PeopleIcon />} />
      </BottomNavigation>
    </Grid>
  );
}

export default Footer;
