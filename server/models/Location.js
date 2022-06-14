const { Schema } = require("mongoose");
const courtSchema = require("./Court");

const locationSchema = new Schema({
  locationName: {
    type: String,
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
});

module.exports = locationSchema;
