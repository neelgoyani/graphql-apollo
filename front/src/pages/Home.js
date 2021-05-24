import React, { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import PostCard from "../component/PostCard";
import { Grid, GridColumn, Transition } from "semantic-ui-react";
import PostForm from "../component/PostForm";
import { FETCH_POSTS } from "../util/graphql";
import { useStateValue } from "../StateProvider";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [{ user }] = useStateValue();

  const { loading, data } = useQuery(FETCH_POSTS);

  useEffect(() => {
    if (data) {
      setPosts(data.getpost);
    }
  }, [data]);

  //   return post;
  // };

  return (
    <>
      <Grid columns={3}>
        <Grid.Row className="page_title">
          <h1>Recent Posts</h1>
        </Grid.Row>

        <Grid.Row>
          {user && (
            <Grid.Column>
              <PostForm />
            </Grid.Column>
          )}

          {loading ? (
            <h1>Loading...</h1>
          ) : (
            <Transition.Group>
              {posts &&
                posts.map((item) => (
                  <Grid.Column key={item.id} style={{ marginBottom: 20 }}>
                    <PostCard post={item} />
                  </Grid.Column>
                ))}
            </Transition.Group>
          )}
        </Grid.Row>
      </Grid>
    </>
  );
};

export default Home;
