import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken'

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
export const SignIn = async (req, res, next) => {
  const {email, password} = req.body;
  if (!email || !password || email === '' || password === ''){
    next(errorHandler(400, 'All field are required'));
  }

  try {
    const valideUser = await User.findOne({ email });
    if (!valideUser){
      next(errorHandler(404, 'User not found'));
    }

    const validePassword = bcryptjs.compareSync(password, valideUser.password);
    if (!validePassword) {
      return next(errorHandler(400, 'Invalid password'));
    }

    const token = jwt.sign({ id: valideUser._id}, process.env.JWT_SECRET);
    const { password: pass, ...rest} = valideUser._doc;
    res.status(200).cookie('access_token', token, {
      httpOnly: true
    }).json(rest);
  } catch (error) {
    next(error)
  }
}