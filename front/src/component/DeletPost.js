import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React, { useState } from "react";
import { Button, Confirm, Icon } from "semantic-ui-react";
import { FETCH_POSTS } from "../util/graphql";

const DeletPost = ({ postId, callback }) => {
  const [confirmDelet, setConfirmDelet] = useState(false);

  const handelCancel = () => {
    setConfirmDelet(false);
  };

  const [deletPost] = useMutation(DELET_POST, {
    update(proxy) {
      const data = proxy.readQuery({
        query: FETCH_POSTS,
      });
      const posts = data.getpost.filter((post) => post.id != postId);
      proxy.writeQuery({
        query: FETCH_POSTS,
        data: { ...data, getpost: posts },
      });
      if (callback) {
        callback();
      }
    },
    variables: { postId },
  });

  return (
    <>
      <Button
        as="div"
        color="red"
        floated="right"
        onClick={() => setConfirmDelet(true)}
      >
        <Icon name="trash" style={{ margin: 0 }} />
      </Button>
      <Confirm
        open={confirmDelet}
        onCancel={handelCancel}
        onConfirm={deletPost}
      />
    </>
  );
};

export default DeletPost;

const DELET_POST = gql`
  mutation deletPost($postId: String!) {
    deletPost(postId: $postId)
  }
`;
