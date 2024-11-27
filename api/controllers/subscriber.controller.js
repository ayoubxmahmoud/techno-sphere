import Subscriber from "../models/subscriber.model.js";

export const Subscription = async (req, res, next) => {
    const { email } = req.body;

    try {
      const existingSubscriber = await Subscriber.findOne({ email });
      if (existingSubscriber) {
        return res
          .status(400)
          .json({ message: "Email is already subscribed." });
      }
  
      const newSubscriber = new Subscriber({ email });
      await newSubscriber.save();
  
      res.status(201).json({ message: "Subscription successful." });
    } catch (error) {
      next(error)
      res.status(500).json({ message: "Server error. Please try again." });
    }

}

