import mongoose from "mongoose";

const HeaderSchema = new mongoose.Schema({
  key: String,
  value: String,
  enabled: Boolean,
});

const RequestHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  name: { type: String, required: true },
  method: { type: String, required: true },
  url: { type: String, required: true },
  headers: [HeaderSchema],
  body: mongoose.Schema.Types.Mixed, // This will now store the raw JSON body as sent by the client
  params: [
    {
      key: String,
      value: String,
      enabled: Boolean,
    },
  ],
  response: {
    status: Number,
    statusText: String,
    headers: mongoose.Schema.Types.Mixed,
    data: mongoose.Schema.Types.Mixed,
    Time: Number,
  },
  createdAt: { type: Date, default: Date.now },
});

const RequestHistory = mongoose.model("RequestHistory", RequestHistorySchema);

export default RequestHistory;
