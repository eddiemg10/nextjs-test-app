import dbConnect from "../../../lib/dbConnect";
import Comments from "../../../models/Comments";

export default async function handler(req, res) {
  dbConnect();

  if (req.method === "GET") {
    getComments();
  }
  if (req.method === "POST") {
    postComment(req.body);
  }
  //   run();

  async function postComment({ comment, age, user }) {
    const newComment = new Comments({
      comment,
      user,
      age,
    });
    try {
      await newComment.save();
      res.status(201).json(newComment);
    } catch (error) {
      console.log(error.errors);
      res.status(400).json({ success: false, error: error.errors });
    }
  }

  async function getComments() {
    try {
      const data = await Comments.find();
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json({ success: false, error });
    }
  }
}
