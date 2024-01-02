import Post from "../models/postSchema.js";

const getMyPosts = async (req, res) => {
  try {
    const username = req.username; // Assuming req.userId contains the username after authentication

    if (!username) {
      return res.status(400).json({ message: "Username not found in middleware" });
    }

    const myPosts = await Post.find({ username });

    return res.status(200).json({ myPosts });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default getMyPosts;
