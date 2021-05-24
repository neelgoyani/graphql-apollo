import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Button, Icon, Label } from "semantic-ui-react";

const LikePost = ({ user, post: { id, likes, likeCount } }) => {
  const history = useHistory();
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    if (user && likes.find((like) => like.userName == user)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [user, likes]);

  const [likePost, { loading }] = useMutation(LIKE_POST, {
    variables: { postId: id },
  });

  const gotoLogin = () => {
    history.push("/login");
  };

  return (
    <>
      <Button
        as="div"
        labelPosition="right"
        onClick={user ? likePost : gotoLogin}
      >
        <Button color={liked ? "red" : "teal"} basic>
          <Icon name="heart" />
        </Button>
        <Label as="a" basic color={liked ? "red" : "teal"} pointing="left">
          {likeCount}
        </Label>
      </Button>
    </>
  );
};

export default LikePost;

const LIKE_POST = gql`
  mutation likePost($postId: String!) {
    likePost(postId: $postId) {
      id
      likes {
        userName
      }
      likeCount
    }
  }
`;
