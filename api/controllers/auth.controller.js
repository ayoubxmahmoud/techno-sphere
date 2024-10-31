import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";


export const SignUp = async (req, res, next) => {
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
      next(error);
    }
  } else {
    next(errorHandler(400, "All fields are required"));
  }
};
