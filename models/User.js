import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    age: Number,
    email: {
      type: String,
      required: [true, "Email not entered"],
    },
    createdAt: Date,
    updatedAt: Date,
    friends: [mongoose.SchemaTypes.ObjectId],
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
