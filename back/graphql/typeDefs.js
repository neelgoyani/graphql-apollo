const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    id: ID!
    userName: String!
    token: String!
    createdAt: String!
    email: String!
  }

  type Comment {
    id: ID!
    body: String!
    createdAt: String!
    userName: String!
  }

  type Like {
    id: ID!
    createdAt: String!
    userName: String!
  }

  input userInput {
    userName: String!
    password: String!
    email: String!
    confirmPassword: String!
  }

  type Post {
    body: String!
    userName: String!
    createdAt: String!
    id: ID!
    comments: [Comment]!
    likes: [Like]!
    likeCount: Int!
    commentCount: Int!
  }

  type Query {
    getpost: [Post]!
    getPostById(postId: String!): Post!
  }

  type Mutation {
    createUser(userInput: userInput): User!
    login(userName: String!, password: String!): User!
    deletPost(postId: String!): String!
    createPost(body: String!): Post!
    createComment(postId: String!, body: String!): Post!
    deletComment(postId: String!, commentId: String!): Post!
    likePost(postId: String!): Post!
  }

  type Subscription {
    newPost: Post!
  }
`;
