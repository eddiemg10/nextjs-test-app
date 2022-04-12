import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";

export default async function handler(req, res) {
  dbConnect();

  if (req.method === "GET") {
    getUser(req.query.userID);
  }

  async function getUser(userID) {
    try {
      const data = await User.findById(userID);
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json({ success: false, error });
    }
  }
}
