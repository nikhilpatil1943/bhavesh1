import Post from "../models/postSchema.js";

const likePost = async (req, res) => {
  try {
    const { _id } = req.body;
    const username = req.userId; // Assuming req.userId contains the username after authentication

    if (!_id || !username) {
      return res.status(400).json({ message: "Please provide post _id and username" });
    }

    const post = await Post.findById(_id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const likedIndex = post.likes.indexOf(username);

    if (likedIndex === -1) {
      // User has not liked the post, add username to likes array
      post.likes.push(username);
    } else {
      // User has already liked the post, remove username from likes array
      post.likes.splice(likedIndex, 1);
    }

    await post.save();

    return res.status(200).json({ message: "Post liked/disliked successfully", likes: post.likes });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default likePost;
