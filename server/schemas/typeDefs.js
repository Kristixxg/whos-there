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
    _id: ID
    locationName: String
    checkin: String
    court: Court
  }
  type Court {
    _id: ID
    courtName: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]!
    user(userId: ID!): User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(username: String!, password: String!): Auth

    saveLocation(locationName: String!, checkin: String!): User
    removeLocation(locationId: ID!): User
    saveCourt(courtName: String!): User
    removeCourt(courtId: ID!): User
  }
`;

module.exports = typeDefs;
