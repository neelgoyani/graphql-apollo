const { PubSub } = require("graphql-subscriptions");
const Post = require("../../model/Post");
const checkAuth = require("../../util/checkAuth");

module.exports = {
  Query: {
    getPostById: async (_, { postId }) => {
      const post = await Post.findById(postId);
      return {
        body: post.body,
        userName: post.userName,
        createdAt: post.createdAt,
        id: post._id,
        comments: post.comments,
        likes: post.likes,
      };
    },

    getpost: async () => {
      const post = await Post.find().sort({ createdAt: -1 });

      return post.map((item) => {
        return {
          body: item.body,
          userName: item.userName,
          createdAt: item.createdAt,
          id: item._id,
          comments: item.comments,
          likes: item.likes,
        };
      });
    },
  },

  Mutation: {
    createPost: async (_, { body }, context) => {
      //check authanticated or not

      const user = await checkAuth(context);

      //if authanticated than creat post and return result
      const post = new Post({
        body: body,
        userName: user.userName,
        user: user._id,
        createdAt: new Date().toISOString(),
      });
      const result = await post.save();

      context.pubsub.publish("NEW_POST", {
        newPost: {
          body: result.body,
          userName: result.userName,
          createdAt: result.createdAt,
          id: result._id,
          comments: result.comments,
          likes: result.likes,
        },
      });

      return {
        body: result.body,
        userName: result.userName,
        createdAt: result.createdAt,
        id: result._id,
        comments: result.comments,
        likes: result.likes,
      };
    },

    deletPost: async (_, { postId }, context) => {
      const user = await checkAuth(context);
      console.log(user._id);

      const post = await Post.findById(postId);
      console.log(post.user);
      if (JSON.stringify(post.user) === JSON.stringify(user._id)) {
        await post.delete();
        return "Post deleted succesfully";
      }
      throw new Error("you can not delet this post");
    },

    likePost: async (_, { postId }, context) => {
      //check user is authenticated or not
      const user = await checkAuth(context);

      //if authenticated find post
      const post = await Post.findById(postId);
      if (post) {
        //check user already like
        if (post.likes.find((like) => like.userName == user.userName)) {
          console.log("unlike");
          //if already like post then unlike by filter
          post.likes = await post.likes.filter(
            (like) => like.userName !== user.userName
          );
        } else {
          //if not like then like by push
          await post.likes.push({
            userName: user.userName,
            createdAt: new Date().toISOString(),
          });
        }

        //after complete like and unlike return post object
        await post.save();
        return {
          body: post.body,
          id: post._id,
          userName: post.userName,
          comments: post.comments,
          likes: post.likes,
          createdAt: post.createdAt,
        };
      }
      //if post not available then throw error
      throw new Error("Post not found");
    },
  },
  Subscription: {
    newPost: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("NEW_POST"),
    },
  },
};
