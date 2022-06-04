const { Schema } = require("mongoose");

const locationSchema = new Schema({
  // saved location id from GoogleMaps
  locationId: {
    type: String,
    required: true,
  },
  locationName: {
    type: String,
    required: true,
  },
});

module.exports = locationSchema;
