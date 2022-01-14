import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  year: { type: String, required: true },
  meetings: { type: [String] },
  dayCount: {
    type: Number,
    default: 0,
  },
});

const student = mongoose.model("student", studentSchema);
export default student;
