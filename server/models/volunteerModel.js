import mongoose from "mongoose";

const volunteerSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  classRange: { type: [Number], required: true },
  subjects: { type: [String], required: true },
  meetings: { type: [String], required: true },
  timings: { type: [String], required: true },
  sessionsTaken: {
    type: Number,
    default: 0,
    required: true,
  },
});

const volunteerModel = mongoose.model("volunteerModel", volunteerSchema);
export default volunteerModel;
