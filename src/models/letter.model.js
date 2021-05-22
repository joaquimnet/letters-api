const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      min: 1,
      max: 140,
    },
    from: {
      type: String,
      required: true,
      min: 1,
      max: 140,
    },
    to: {
      type: String,
      required: true,
      min: 1,
      max: 140,
    },
    message: {
      type: String,
      required: true,
      min: 1,
      max: 18071999,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    readOn: {
      type: Date,
    },
  },
  { timestamps: true },
);

module.exports = model('letter', schema);
