import mongoose from "mongoose";

const volunteerSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  classRange: { type: [Number], required: true },
  subjects: { type: [String], required: true },
  meetings: { type: [String] },
  timings: { type: [String] },
  sessionsTaken: {
    type: Number,
    default: 0,
  },
});

const volunteerModel = mongoose.model("volunteerModel", volunteerSchema);
export default volunteerModel;
