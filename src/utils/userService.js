import tokenService from './tokenService';

const BASE_URL = '/api/users/';

// This deals with the type of request the USER may want to make on the client, 
// so what type of http requests the user may make to the express server

function signup(user) {
  return fetch(BASE_URL + 'signup', {
    method: 'POST',
   // you don't need a header if you are sending multipart/formdata (aka sending a photo), the browser will automatically 
   // detect and append the headers
    body: user // <- user needs to be formData (we did that in the handleSubmit in the SignupPage)
  })
  .then(res => {
    // THis is handling the response from our express server after we submit our form and get a response from the server
    if (res.ok) return res.json()
    
    // Probably ja duplicate email
    // the return for the error
    return res.json().then(response => {
      console.log(response.error); // this is the error message
      // from the server
      // you can choose to throw whatever you want
      throw new Error(response.error);
    })
     // throws an error to the catch block where we called the function, SignUpPage handleSUbmit
  })
  // Parameter destructuring!
  .then(({token}) => tokenService.setToken(token)); // storing the token in localstorage (jwt), then we can access that token, to see who the logged in user is, in our react app
  // The above could have been written as
  //.then((token) => token.token);
}

function getUser() {
  return tokenService.getUserFromToken();
}

function logout() {
  tokenService.removeToken();
}

function login(creds) {
  return fetch(BASE_URL + 'login', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(creds)
  })
  .then(res => {// this is where we recieve the respons from the login controller
    // Valid login if we have a status of 2xx (res.ok)
    if (res.ok) return res.json();
    throw new Error('Bad Credentials!');
  })
  .then(({token}) => tokenService.setToken(token));
}

// the definition
// this is the function that makes a request to the profile controller function on the express back end api
function getProfile(username){
  return fetch(BASE_URL + username, {
    headers: {
			Authorization: "Bearer " + tokenService.getToken() 
			//this is how we grab the token from local storage
		}
  }).then(res => {
    if(res.ok) return res.json() // decoding the json from the server response
    // so that we can interact with it like a regular javascript object
    throw new Error('Error from getProfile request, check the server terminal')
  })
}



export default {
  signup, 
  getUser,
  logout,
  login,
  getProfile
};