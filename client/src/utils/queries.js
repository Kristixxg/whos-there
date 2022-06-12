import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  query Me {
    me {
      _id
      username
      email
      location {
        _id
        locationName
        checkin
        latitude
        longitude
        court {
          _id
          courtName
        }
      }
    }
  }
`;

export const QUERY_USERS = gql`
  query allUsers {
    users {
      _id
      username
      email
      location {
        _id
        locationName
        checkin
        latitude
        longitude
      }
    }
  }
`;

export const QUERY_SINGLE_USER = gql`
  query singleUser($userId: ID!) {
    user(userId: $userId) {
      _id
      username
      email
    }
  }
`;
