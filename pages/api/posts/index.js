import dbConnect from "../../../lib/dbConnect";
import Posts from "../../../models/Posts";

export default async function handler(req, res) {
  dbConnect();

  if (req.method === "GET") {
    getPosts();
  }
  if (req.method === "POST") {
    addPost(req.body);
  }
  //   run();

  async function addPost({ image, user, caption }) {
    const newPost = new Posts({
      image,
      user,
      caption,
    });
    try {
      await newPost.save();
      res.status(201).json(newComment);
    } catch (error) {
      console.log(error.errors);
      res.status(400).json({ success: false, error: error.errors });
    }
  }

  async function getPosts() {
    try {
      const data = await Posts.find();
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json({ success: false, error });
    }
  }
}
