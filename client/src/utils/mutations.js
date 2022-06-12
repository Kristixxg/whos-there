import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        email
        username
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_LOCATION = gql`
  mutation saveLocation(
    $locationName: String!, 
    $checkin: String,
    $latitude: String,
    $longitude: String
  ) {
    saveLocation(
      locationName: $locationName,
      checkin: $checkin,
      latitude: $latitude,
      longitude: $longitude
    ) {
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

export const REMOVE_LOCATION = gql`
  mutation removeLocation($locationId: ID!) {
    removeLocation(locationId: $locationId) {
      _id
      username
      email
      location {
        _id
        locationName
        checkin
      }
    }
  }
`;

export const SAVE_COURT = gql`
  mutation SaveCourt($courtName: String!) {
    saveCourt(courtName: $courtName) {
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

export const REMOVE_COURT = gql`
  mutation removeCourt($courtId: ID!) {
    removeCourt(courtId: $courtId) {
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
