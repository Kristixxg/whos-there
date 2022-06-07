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

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    saveLocation(locationId: String!, locationName: String!): User
    removeLocation(locationId: String!): User
  }
`;

module.exports = typeDefs;
