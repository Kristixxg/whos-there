const { Schema } = require("mongoose");
const courtSchema = require("./Court");

const locationSchema = new Schema({
  locationName: {
    type: String,
    // required: true,
  },
  checkin: {
    type: String,
  },
  latitude: {
    type: String,
  },
  longitude: {
    type: String,
  },
  court: courtSchema,
});

module.exports = locationSchema;
