import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useHistory, useParams } from "react-router";
import {
  Button,
  Card,
  Grid,
  Icon,
  Image,
  Label,
  Transition,
} from "semantic-ui-react";
import moment from "moment";
import LikePost from "./LikePost";
import { useStateValue } from "../StateProvider";
import DeletPost from "./DeletPost";
import CreateComment from "./CreateComment";
import DeletComment from "./DeletComment";

const SinglePost = () => {
  const [{ user }] = useStateValue();
  const history = useHistory();
  const { postId } = useParams();

  const { data } = useQuery(GETPOSTBYID, {
    variables: { postId: postId },
  });
  let getPostById;
  if (data) {
    getPostById = data.getPostById;
  }

  const afterDelet = () => {
    history.push("/");
  };

  let returnValue;
  if (getPostById) {
    const {
      body,
      createdAt,
      id,
      likeCount,
      comments,
      commentCount,
      userName,
      likes,
    } = getPostById;

    returnValue = (
      <>
        <Grid>
          <Grid.Row>
            <Grid.Column width={2}>
              <Image
                src="https://react.semantic-ui.com/images/avatar/large/jenny.jpg"
                size="small"
                floated="right"
              />
            </Grid.Column>
            <Grid.Column width={10}>
              <Card fluid>
                <Card.Content>
                  <Card.Header>{userName}</Card.Header>
                  <Card.Meta>{moment(createdAt).fromNow(true)}</Card.Meta>
                  <Card.Description>{body}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <LikePost
                    user={user}
                    post={{ id: id, likeCount: likeCount, likes: likes }}
                  />
                  <Button as="div" labelPosition="right">
                    <Button color="blue" basic>
                      <Icon name="comments" />
                    </Button>
                    <Label as="a" basic color="blue" pointing="left">
                      {commentCount}
                    </Label>
                  </Button>
                  {user && userName == user && (
                    <DeletPost postId={id} callback={afterDelet} />
                  )}
                </Card.Content>
              </Card>
              <Card>{user && <CreateComment postId={id} />}</Card>
              <Transition.Group>
                {comments.map((comment) => (
                  <Card fluid>
                    <Card.Content>
                      {user && user == comment.userName && (
                        <DeletComment commentId={comment.id} postId={id} />
                      )}
                      <Card.Header>{comment.userName}</Card.Header>
                      <Card.Meta>
                        {moment(comment.createdAt).fromNow(true)}
                      </Card.Meta>
                      <Card.Description>{comment.body}</Card.Description>
                    </Card.Content>
                  </Card>
                ))}
              </Transition.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </>
    );
  } else {
    returnValue = <p>Loading...</p>;
  }
  return returnValue;
};

export default SinglePost;

const GETPOSTBYID = gql`
  query ($postId: String!) {
    getPostById(postId: $postId) {
      createdAt
      userName
      body
      id
      commentCount
      comments {
        id
        body
        createdAt
        userName
      }
      likeCount
      likes {
        userName
      }
    }
  }
`;
