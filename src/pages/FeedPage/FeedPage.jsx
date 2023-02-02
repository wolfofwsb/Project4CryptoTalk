import PageHeader from "../../components/PageHeader/PageHeader";
import AddPuppyForm from "../../components/AddCryptoForm/AddCryptoForm";
import PostDisplay from "../../components/PostDisplay/PostDisplay";
import Loader from "../../components/Loader/Loader";

import { useState, useEffect } from "react";

// import { create } from '../../utils/postApi'
import * as postsAPI from "../../utils/postApi";
import * as likesAPI from "../../utils/likeApi";



import { Grid } from "semantic-ui-react";

// think of your pages as containers
// that store your logic!
function FeedPage({loggedUser, handleLogout}) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function addLike(postId) {
    // postId exists in the card component
    try {
      const response = await likesAPI.create(postId);
      console.log(response, " response from likes APi");
      // update the cards with likes array
      getPosts();// getPosts updates our state, so we'll see a change in the UI, heart will go to red
    } catch (err) {
      console.log(err.message, " add like");
    }
  }

  async function removeLike(likeId) {
    // postId exists in the card component
    try {
      const response = await likesAPI.deleteLike(likeId);
      console.log(response, " response from likes APi");
      // update the cards with likes array
      getPosts();// getPosts updates our state, so we'll see a change in the UI, heart will go to grey
    } catch (err) {
      console.log(err.message, " remove like");
    }
  }

  // Why?
  // Creating a POST (C)RUD
  // cuz we want to update state whenever we change a POST CRUD operations*
  async function handleAddPost(post) {
    // post, is coming from the addPostForm component, when we call this function onSubmit props.handleAddPost(formData)
    try {
      // this is where we will make the api call to our server
      // because we'll get the response and then we can update state to reflect that change
      // like adding a new post
      setLoading(true);
      const response = await postsAPI.create(post); // waiting for the json to be return from the server and parsed by us!

      // data is the response from the api, the result of the .then if(res.ok) return res.json() in the create postAPI utils function
      console.log(response, " handle add post");
      setPosts([response.post, ...posts]); /// ...posts would keep all the posts in the previous states array
      setLoading(false);
    } catch (err) {
      // this is the error from the throw block, in the postsAPI.create function
      console.log(err.message, "error in addPost");
      setError("Error creating post, please try again");
    }
  }

  async function getPosts() {
    try {
      const response = await postsAPI.getAll();
      console.log(response, " data");
      setPosts(response.data);
      setLoading(false);
    } catch (err) {
      console.log(err.message, " this is the error in getPosts");
      setLoading(false);
    }
  }

  useEffect(() => {
    //Getting posts, C(R)UD

    getPosts();
  }, []); // This is useEffect runs once when the Feed component
  // loads

  if (error) {
    return (
      <>
        <PageHeader handleLogout={handleLogout} loggedUser={loggedUser}/>
        <ErrorMessage error={error} />;
      </>
    );
  }

  return (
    <Grid centered>
      <Grid.Row>
        <Grid.Column>
        <PageHeader handleLogout={handleLogout} loggedUser={loggedUser}/>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 450 }}>
          <AddPuppyForm handleAddPost={handleAddPost} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 450 }}>
          <PostDisplay
            posts={posts}
            numPhotosCol={1}
            isProfile={false}
            loading={loading}
            addLike={addLike}
            removeLike={removeLike}
            loggedUser={loggedUser}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default FeedPage;
