import mongoose from "mongoose";

// Fully dynamic schema to store any JSON
const DataSchema = new mongoose.Schema(
  {},
  {
    timestamps: true,
    strict: false // Allow any fields
  }
);

const Data = mongoose.model("Data", DataSchema);

export default Data;