// house all the fetch functions for crud updates on the POST resource
import tokenService from "./tokenService";
const BASE_URL = '/api/posts/';
// THESE FUNCTIONS ARE CALLED In our componets 
// in the browser to communicate with our EXPRESS SERVER
// aka the endpoints are our servers routes, which call the controller functions

// Making a request to create a POST
export function create(data){
	return fetch(BASE_URL, { // since this is sending a photo (form data) no need to do JSON things
		method: 'POST',
		body: data,
		headers: {
			Authorization: "Bearer " + tokenService.getToken() 
			//this is how we grab the token from local storage
		}

	}).then((responseFromTheServer) =>{
		if(responseFromTheServer.ok) return responseFromTheServer.json() // return if everything okay

		// this is the return if there was an error from the server
		return responseFromTheServer.json().then(res => {
			console.log(res, ' <- this is the response in Posts create function in your utils folder')
			throw new Error('Something went wrong in create Post'); // < this goes to the catch block
			// when you call the create function (in handleAddPost in the feed page)
		})
	})
}


export function getAll() {
	return fetch(BASE_URL, {
	  headers: {
		'Authorization': 'Bearer ' + tokenService.getToken()
	  }
	})
	.then(res => res.json());
  }