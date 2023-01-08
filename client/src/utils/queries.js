import { gql } from "@apollo/client";

export const ME = gql`
  query me {
    me {
      username
      friends {
        userId {
          username
        }
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
