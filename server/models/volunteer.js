import mongoose from "mongoose";
import {meetingSchema} from "./meeting.js";
const volunteerSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  classRange: { type: [Number], required: true },
  subjects: { type: [String], required: true },
  meetings: { type: [meetingSchema] },
  availableSlots: { type: [String] },
  sessionsTaken: {
    type: Number,
    default: 0,
  },
  userType: { type: String, required: true },
});

const volunteer = mongoose.model("volunteer", volunteerSchema);
export default volunteer;
