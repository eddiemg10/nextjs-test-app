import mongoose from "mongoose";

const postsSchema = new mongoose.Schema({
  image: { type: String, required: [true, "You need to add an image"] },
  user: { type: mongoose.SchemaTypes.ObjectId, required: true },
  caption: { type: String },
});

export default mongoose.models.Posts || mongoose.model("Posts", postsSchema);
