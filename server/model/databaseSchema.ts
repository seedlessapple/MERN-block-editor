import mongoose, { Schema } from "mongoose";
const DatabaseFieldSchema: Schema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["string", "number", "boolean", "array", "object"],
      default: "string",
    },
    field: {
      type: String,
      default: "",
    },
    required: {
      type: Boolean,
      default: false,
    },
    unique: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);
const DatabaseSchema: Schema = new mongoose.Schema({
  _name: {
    type: String,
    required: true,
    unique: true,
  },
  size: {
    type: String,
    required: false,
  },
  fields: {
    type: [DatabaseFieldSchema],
    required: false,
  },
  _data: {
    type: [Object],
    default: [],
  },
});

export default mongoose.model("Database", DatabaseSchema);
