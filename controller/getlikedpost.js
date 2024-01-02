import Post from "../models/postSchema.js";

const getUserLikedPosts = async (req, res) => {
  try {
    const username = req.userId; // Assuming req.userId contains the username after authentication

    if (!username) {
      return res.status(400).json({ message: "Username not found in middleware" });
    }

    const post = await Post.find({ likes: username });
    console.log(post)
    return res.status(200).json({ post, currentPage:1, totalPages:1  });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default getUserLikedPosts;
