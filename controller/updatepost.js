import Post from "../models/postSchema.js";

const updatePost = async (req, res) => {
  try {
    const { _id, body } = req.body;

    if (!_id || !body) {
      return res.status(400).json({ message: "Please provide post _id and updated body" });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      _id,
      { $set: { body }, $currentDate: { date: true } },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    return res.status(200).json({ message: "Post updated successfully", updatedPost });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default updatePost;
