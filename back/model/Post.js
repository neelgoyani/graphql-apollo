const { model, Schema } = require("mongoose");

const postSchema = new Schema({
  body: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
  comments: [
    {
      body: {
        type: String,
        required: true,
      },
      userName: {
        type: String,
        required: true,
      },
      createdAt: {
        type: String,
        required: true,
      },
    },
  ],
  likes: [
    {
      userName: {
        type: String,
        required: true,
      },
      createdAt: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = model("Post", postSchema);
