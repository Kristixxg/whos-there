const { Schema } = require("mongoose");

const courtSchema = new Schema({
  // saved court id from GoogleMaps API
  courtId: {
    type: String,
    required: true,
  },
  courtName: {
    type: String,
    required: true,
  },
});

module.exports = courtSchema;
