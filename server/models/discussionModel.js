import mongoose from "mongoose";

const discussionSchema = mongoose.Schema({
  question: { type: String, required: true },
  askedBy: { type: String, required: true },
  answers: [
    {
      answeredBy: { type: String, required: true },
      answerArray: { type: [String], required: true },
    },
  ],
});

const discussionModel = mongoose.model("discussionModel", discussionSchema);
export default discussionModel;
