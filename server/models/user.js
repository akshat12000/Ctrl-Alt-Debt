import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required:  true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
  year: { type: Number },
  meetings:{ type: [String] },
  dayCount: { type: Number ,default: 0}
});

export default mongoose.model("User", userSchema);