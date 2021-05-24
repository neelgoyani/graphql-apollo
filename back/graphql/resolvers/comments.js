const Post = require("../../model/Post");
const checkAuth = require("../../util/checkAuth");

module.exports = {
  Mutation: {
    createComment: async (_, { postId, body }, context) => {
      //check user is authenticated
      const user = await checkAuth(context);
      //if authenticated then find post by id
      const post = await Post.findById(postId);
      if (post) {
        //if post available than push comment
        post.comments.unshift({
          body,
          userName: user.userName,
          createdAt: new Date().toISOString(),
        });
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
      //if post not found then throw error
      throw new Error("Post not found");
    },

    deletComment: async (_, { postId, commentId }, context) => {
      //check user isauthenticated or not
      const user = await checkAuth(context);

      //if authenticated then find post by id
      const post = await Post.findById(postId);
      if (post) {
        // if post available then find index of comment in comments
        const commentIndex = await post.comments.findIndex(
          (item) => item._id == commentId
        );
        if (commentIndex < 0) {
          throw new Error("Comment Not found");
        }
        // console.log(post.comments[commentIndex], commentIndex);
        if (post.comments[commentIndex].userName === user.userName) {
          //if comment found and made by authenticated user than delet this comment
          post.comments.splice(commentIndex, 1);
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
        //if comment not made by authenticated user then throw error
        throw new Error("You can not delet this comment");
      }
      //if post not awailable then throw error
      throw new Error("Post not available");
    },
  },
};
