import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";

export default async function handler(req, res) {
  dbConnect();

  run();

  async function run() {
    const user = new User({
      name: "Sabastian 2.0",
      age: 20,
      email: "submsv@hotmail.ke",
    });
    try {
      await user.save();
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  }
}
