import { Schema, model, models } from 'mongoose';

const PostSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  post_title: {
    type: String,
    required: [true, 'Post Title is required.'],
  },
  post_tag: {
    type: String,
    required: [true, 'Tag is required.'],
  },
  post_content: {
    type: String,
    required: [true, 'Post Content is required.'],
  },
});



const Post = models.Post || model('Post', PostSchema);

export default Post;