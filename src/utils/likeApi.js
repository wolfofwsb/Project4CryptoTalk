import tokenService from "./tokenService";

const BASE_URL = '/api/'

export function create(postId){
	return fetch(`${BASE_URL}posts/${postId}/likes`, {
		method: 'POST',
		headers: {
			Authorization: "Bearer " + tokenService.getToken() 
			//this is how we grab the token from local storage
		}
	}).then(res => {
		// This gets called when we get a response from the 
		// express server create like controller function
		if(res.ok) return res.json()
		throw new Error('Error creating a like, check server terminal')
	})
}

// create the delete function
// ask yourself what information does this function need on each call
// what is changing each time, that is your argument
export function deleteLike(likeId){
	return fetch(`${BASE_URL}likes/${likeId}`, {
		method: 'DELETE',
		headers: {
			Authorization: "Bearer " + tokenService.getToken() 
			//this is how we grab the token from local storage
		}	
	}).then(res => {
		// res is the response from the server
		// This gets called when we get a response from the 
		// express server deleteLike controller function
		if(res.ok) return res.json() // taking json and turning into and js object
		throw new Error('Error deleting a like, check the server terminal')
	})
}