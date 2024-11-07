import Post from '../models/post.model.js';
import { errorHandler } from '../utils/error.js';


export const createPost = async (req, res, next) => {    
    // Check if the user is an admin before allowing post creation
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to create post"));
  }
  if (!req.body.title || !req.body.content) {
    return next(errorHandler(400, "Please provide all required fields"));
  }

  // Generate a slug from the title by replacing spaces with hyphens and converting to lowercase
  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "-");
    // Create a new Post instance with the request data and the generated slug
  const newPost = new Post({
    ...req.body,
    slug,
    userId: req.user.id,
  });

  try {
    // Attempt to save the post to the database
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    next(error); // Pass any errors to the errorHandler function
  }
};
