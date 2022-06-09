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
        court {
          _id
          courtName
        }
      }
    }
  }
`;
