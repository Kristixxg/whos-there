const { Schema } = require("mongoose");

const courtSchema = new Schema({
  courtName: {
    type: String,
    required: true,
  },
});

module.exports = courtSchema;
