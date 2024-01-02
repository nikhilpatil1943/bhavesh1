import Post from "../models/postSchema.js";

const getAllPosts = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Default page: 1, Default limit: 10 posts per page
    const skip = (page - 1) * limit;

    const posts = await Post.find()
      .sort({ date: -1 }) // Sorting posts by date in descending order
      .skip(skip)
      .limit(limit);

    return res.status(200).json({ posts, currentPage: parseInt(page), totalPages: Math.ceil(posts.length / limit) });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default getAllPosts;
