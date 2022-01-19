import mongoose from "mongoose";
import {meetingSchema} from "./meeting.js";

const studentSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  year: { type: String, required: true },
  meetings: { type: [meetingSchema] },
  dayCount: {
    type: Number,
    default: 0,
  },
  userType: { type: String, required: true },
});

const student = mongoose.model("student", studentSchema);
export default student;
