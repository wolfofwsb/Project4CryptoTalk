import { Button, Form, Grid, Header, Image, Segment } from "semantic-ui-react";
import { useState } from "react";
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import './signuppage.css'

import { useNavigate } from "react-router-dom";
// Since we want to make a request as a user about a user
// we need to import the userService
import userService from "../../utils/userService";

function SignUpPage({handleSignUpOrLogin}) {
  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    passwordConf: "",
    bio: "",
  });

  const [selectedFile, setSelectedFile] = useState("");

  const [error, setError] = useState("");

  // initialize the useNavigate hook, which allows us to programatticaly change routes
  // aka after our signup call in our handleSubmit
  // navigate is a function that accepts a routes path
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault(); // stop the browser from submitting the form, we will use fetch. We are using a SPA (single, page, app, no page reloads)

    // before we use our userService function
    // since we are sending over to the express server a file (photo), we can't send json
    // we have to convert our data into formData!
    // THIS ONLY HAS TO BE DONE WHEN YOU'RE SENDING A FILE (PHOTO TO THE SERVER, everything else is just JSON
    const formData = new FormData();
    formData.append("photo", selectedFile);

    // formData.append('username', state.username)
    // formData.append('email', state.email)
    for (let key in state) {
      formData.append(key, state[key]);
    }

	// if you console.log(formData, ' <this won't yield anything useful')
    // If you want to view the formData you need to loop over the object
    console.log(formData.forEach((item) => console.log(item)));

	try {
		
		await userService.signup(formData); // this finishes, after the signup fetch call sets the token in localstorage
		// after this we can route the user to whereever we want
		// the jwt token is now stored in localstorage
		handleSignUpOrLogin(); // this function is from the app, which gets the token and sets the user in the App component state
		// switch the view, switch what page we are on
		navigate('/')

	} catch(err){
		console.log(err.message, ' this is the error in signup')
		setError('Check your terminal, there was an error signing up')
	}




  }

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  function handleFileInput(e) {
    // e.target.files is an array, we just want the first file uploaded to set in state
    setSelectedFile(e.target.files[0]);
  }

  return (

    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="neon green" textAlign="center">
          <Image src="https://discord.me/cdn-cgi/image/format=auto/https://edge.discord.me/server/54f3e7c462ab25ba12d2140a50a0b552bb047a19d8cba6dbcb0ca42c98919840/icon_4e014386765f37212638cfc11d2347fd496bf5fe624e795a5513d9c44ff45d70.jpg" /> Sign Up
        </Header>
        <Form autoComplete="off" onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              name="username"
              placeholder="username"
              value={state.username}
              onChange={handleChange}
              required
            />
            <Form.Input
              type="email"
              name="email"
              placeholder="email"
              value={state.email}
              onChange={handleChange}
              required
            />
            <Form.Input
              name="password"
              type="password"
              placeholder="password"
              value={state.password}
              onChange={handleChange}
              required
            />
            <Form.Input
              name="passwordConf"
              type="password"
              placeholder="Confirm Password"
              value={state.passwordConf}
              onChange={handleChange}
              required
            />
            <Form.TextArea
              label="bio"
              name="bio"
              value={state.bio}
              placeholder="Whats the most you've YOLOd? Whats your favorite crypto? Whens your divorce finalizing? Haha. "
              onChange={handleChange}
            />
            <Form.Field>
              <Form.Input
                type="file"
                name="photo"
                placeholder="upload image"
                onChange={handleFileInput}
              />
            </Form.Field>
            <Button type="submit" className="btn">
              Sign me up!!!
            </Button>
          </Segment>
          {error ? <ErrorMessage error={error} /> : null}
        </Form>
      </Grid.Column>
    </Grid>
  );
}

export default SignUpPage;
