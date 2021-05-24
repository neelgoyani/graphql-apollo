import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Button, Confirm, Icon } from "semantic-ui-react";

const DeletComment = ({ commentId, postId }) => {
  const [deletComment, setDeletComment] = useState(false);
  const [deletConfirm] = useMutation(DELET_COMMENT, {
    update() {
      setDeletComment(false);
    },
    variables: { commentId: commentId, postId: postId },
  });
  return (
    <>
      <Button
        as="div"
        color="red"
        floated="right"
        onClick={() => setDeletComment(true)}
      >
        <Icon name="trash" style={{ margin: 0 }} />
      </Button>
      <Confirm
        open={deletComment}
        onCancel={() => setDeletComment(false)}
        onConfirm={deletConfirm}
      />
    </>
  );
};

export default DeletComment;

const DELET_COMMENT = gql`
  mutation deletComment($postId: String!, $commentId: String!) {
    deletComment(postId: $postId, commentId: $commentId) {
      id
      userName
      commentCount
      comments {
        id
        body
        userName
        createdAt
      }
      createdAt
    }
  }
`;
