const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    users: async () => {
      return User.find();
    },

    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId });
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      console.log("resolver");
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw new AuthenticationError("No user with this username found!");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
      }

      const token = signToken(user);
      return { token, user };
    },

    saveLocation: async (
      parent,
      { locationName, checkin, latitude, longitude },
      context
    ) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $set: {
              location: {
                locationName: locationName,
                checkin: checkin,
                latitude: latitude,
                longitude: longitude,
              },
            },
          },
          {
            new: true,
          }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    removeLocation: async (parent, { locationId }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $unset: { location: { locationId } },
          },
          { new: true }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    saveCourt: async (parent, { courtName }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $set: { "location.court.courtName": courtName },
          },
          {
            new: true,
          }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    removeCourt: async (parent, { courtId }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $unset: { "location.court": courtId },
          },
          { new: true }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
