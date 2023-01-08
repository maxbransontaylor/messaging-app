import { gql } from "@apollo/client";

export const ME = gql`
  query me {
    me {
      _id
      username
      friends {
        userId
      }
      chats {
        users {
          username
        }
        messages {
          message
          sentBy {
            _id
            username
          }
        }
      }
    }
  }
`;
