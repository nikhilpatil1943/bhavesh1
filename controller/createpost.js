import Post from "../models/postSchema.js";

const createPost = async (req, res) => {
  try {
    const { heading, body } = req.body;
    const username = req.username; 
    console.log(username)
    console.log(req.body)// Assuming req.userId contains the username after authentication

    if (!heading || !body || !username) {
      return res.status(400).json({ message: "Please provide heading, body, and username" });
    }

    const newPost = new Post({
      heading,
      body,
      username,
    });

    await newPost.save();

    return res.status(201).json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default createPost;
