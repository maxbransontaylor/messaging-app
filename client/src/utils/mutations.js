import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        _id
      }
      token
    }
  }
`;
export const SIGN_UP = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
    }
  }
`;

export const ADD_FRIEND = gql`
  mutation addFriend($to: String!) {
    addFriend(to: $to) {
      _id
      username
      friends {
        status
        userId
        username
      }
    }
  }
`;
