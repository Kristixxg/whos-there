const { Schema } = require("mongoose");
const courtSchema = require("./Court");

const locationSchema = new Schema({
  // saved location id from GoogleMaps API
  locationId: {
    type: String,
    required: true,
  },
  locationName: {
    type: String,
    required: true,
  },
  court: courtSchema,
});

module.exports = locationSchema;
