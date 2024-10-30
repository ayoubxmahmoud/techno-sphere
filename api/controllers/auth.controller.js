import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";


export const SignUp = async (req, res) => {
  const { username, email, password } = req.body;

  if (username && email && password) {
    try {
        const hashedPassword = bcryptjs.hashSync(password, 10)
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });
      await newUser.save();
      res.json("Sign up successful");
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    return res.status(400).json({ message: "All fields are required" });
  }
};
