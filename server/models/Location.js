const { Schema } = require("mongoose");
const courtSchema = require("./Court");

const locationSchema = new Schema({
  locationName: {
    type: String,
    // required: true,
  },
  court: courtSchema,
});

module.exports = locationSchema;
