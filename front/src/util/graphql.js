import gql from "graphql-tag";

export const FETCH_POSTS = gql`
  {
    getpost {
      createdAt
      userName
      body
      id
      commentCount
      comments {
        id
        userName
        body
        createdAt
      }
      likeCount
      likes {
        userName
      }
    }
  }
`;
