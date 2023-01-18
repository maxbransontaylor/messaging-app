import {
  Input,
  InputLabel,
  FormControl,
  FormHelperText,
  TextField,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/system";
import React from "react";
import { useMutation } from "@apollo/client";
import { ADD_FRIEND, CONFIRM_FRIEND } from "../utils/mutations";
function FriendDash({ me, friends, refetch }) {
  const [addFriend, { error }] = useMutation(ADD_FRIEND);
  const [confirmFriendMutation] = useMutation(CONFIRM_FRIEND);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const newFriend = await addFriend({
      variables: { to: data.get("username") },
    });
  };
  const confirmFriend = async (to) => {
    const confirm = await confirmFriendMutation({ variables: { to } });
    refetch();
    console.log(confirm);
  };
  // filter friends array into 3 different categories based on status
  const sent = friends?.filter((friend) => friend.status === "sent");
  const received = friends?.filter((friend) => friend.status === "received");
  const accepted = friends?.filter((friend) => friend.status === "accepted");

  return (
    <>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField label="add friend by username" name="username"></TextField>
      </Box>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="currentfriends-content"
          id="currentfriends"
        >
          <Typography>Friends List ({accepted?.length})</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {accepted?.map((friend) => (
            <div>{friend.username}</div>
          ))}
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="receivedrequests-content"
          id="receivedrequests"
        >
          <Typography>Received ({received?.length})</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {received?.map((friend) => {
            return (
              <>
                <div>{friend.username}</div>
                <Button onClick={() => confirmFriend(friend.userId)}>
                  Accept
                </Button>
              </>
            );
          })}
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="sentrequests-content"
          id="sentrequests"
        >
          <Typography>Sent ({accepted?.length})</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {sent?.map((friend) => (
            <div>{friend.username}</div>
          ))}
        </AccordionDetails>
      </Accordion>
    </>
  );
}
export default FriendDash;
