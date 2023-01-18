import {
  Input,
  InputLabel,
  FormControl,
  FormHelperText,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useMutation } from "@apollo/client";
import { ADD_FRIEND } from "../utils/mutations";
function FriendDash({ me, friends }) {
  const [addFriend, { error }] = useMutation(ADD_FRIEND);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const newFriend = await addFriend({
      variables: { to: data.get("username") },
    });
  };

  return (
    <>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField label="add friend by username" name="username"></TextField>
      </Box>
      {friends?.map((friend) => {
        return (
          <div key={friend.userId}>
            <div>{friend.username}</div>
            <div>{friend.status}</div>
          </div>
        );
      })}
    </>
  );
}
export default FriendDash;
