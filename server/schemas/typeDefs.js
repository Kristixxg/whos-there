const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    location: Location
  }

  type Location {
    locationId: String
    locationName: String
    court: Court
  }
  type Court {
    courtId: String
    courtName: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
  }
`;

module.exports = typeDefs;
