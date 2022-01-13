import mongoose from "mongoose";

const meetingSchema = mongoose.Schema({
  studentId: { type: String, required: true },
  volunteerId: { type: String, required: true },
  date: {
    type: Date,
    default: new Date(),
    required: true,
  },
  time: [
    {
      startTime: {
        type: String,
        required: true,
      },
      endTime: {
        type: String,
        required: true,
      },
    },
  ],
  meetLink: { type: String, required: true },
  subject: { type: String, required: true },
  year: { type: String, required: true },
  doubtDescription: { type: String, required: true },
});

const meetingModel = mongoose.model("meetingModel", meetingSchema);
export default meetingModel;
