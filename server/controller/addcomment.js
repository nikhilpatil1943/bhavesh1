import Post from "../models/postSchema.js";

const addComment = async (req, res) => {
  try {
    const { _id, comment } = req.body;
    const username = req.userId; // Assuming req.userId contains the username after authentication

    if (!_id || !comment || !username) {
      return res.status(400).json({ message: "Please provide post _id, comment, and username" });
    }

    const post = await Post.findById(_id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const newComment = {
      username,
      comment,
    };

    post.comments.push(newComment);
    await post.save();

    return res.status(200).json({ message: "Comment added successfully", post });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default addComment;
