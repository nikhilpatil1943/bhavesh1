import Post from "../models/postSchema.js";

const bookmarkPost = async (req, res) => {
  try {
    const { _id } = req.body;
    const username = req.userId; // Assuming req.userId contains the username after authentication
    console.log(username, _id);
    if (!_id || !username) {
      return res.status(400).json({ message: "Please provide post _id and username" });
    }

    const post = await Post.findById(_id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    try {
      // Check if the 'bookmarks' property exists in the post document
      if (!post.bookmarks) {
        post.bookmarks = [];
      }

      const bookmarkIndex = post.bookmarks.indexOf(username);

      if (bookmarkIndex === -1) {
        // User has not bookmarked the post, add username to bookmarks array
        post.bookmarks.push(username);
      } else {
        // User has already bookmarked the post, remove username from bookmarks array
        post.bookmarks.splice(bookmarkIndex, 1);
      }

      await post.save();

      return res.status(200).json({
        message: "Post bookmarked/unbookmarked successfully",
        bookmarks: post.bookmarks,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error handling bookmarks" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default bookmarkPost;
