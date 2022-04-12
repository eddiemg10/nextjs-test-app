import mongoose from "mongoose";

const commentsSchema = new mongoose.Schema({
  comment: { type: String, required: [true, "You need to enter a comment"] },
  user: { type: mongoose.SchemaTypes.ObjectId, required: true },
  age: { type: Number, required: [true, "You need to add an age"] },
});

export default mongoose.models.Comments ||
  mongoose.model("Comments", commentsSchema);
