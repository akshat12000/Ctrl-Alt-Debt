import mongoose from "mongoose";

const blogsSchema = mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  year: {
    type: Number,
    required: true,
  },
  subject: { type: String, required: true },
  creator: { type: String, required: true },
  upvotes: {
    type: Number,
    default: 0,
    required: true,
  },
});

const blogsModel = mongoose.model("blogsModel", blogsSchema);
export default blogsModel;
