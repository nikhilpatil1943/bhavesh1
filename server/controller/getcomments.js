import Post from "../models/postSchema.js";

const getAllComments = async (req, res) => {
  try {
    const { _id } = req.body;

    if (!_id) {
      return res.status(400).json({ message: "Please provide post _id" });
    }

    const post = await Post.findById(_id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comments = post.comments;

    return res.status(200).json({ comments });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default getAllComments;
