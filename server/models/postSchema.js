import mongoose from 'mongoose';

const { Schema } = mongoose;

const commentSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const postSchema = new Schema({
  heading: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  likes: [
    {
      type: String,
      required: true,
    },
  ],
  comments: [commentSchema],
});

const Post = mongoose.model('Post', postSchema);

export default Post;
