import User from '../models/user.js'
import Post from '../models/post.js'
import jwt from 'jsonwebtoken'
const SECRET = process.env.SECRET;

import {s3} from '../config/s3-config.js'

// We'll use this module to help us generate random names for our photo files on aws
import { v4 as uuidv4 } from 'uuid';

// So we don't have to worry about people having different bucket names we'll make the bucketname an environment variable
const BUCKET_NAME = process.env.BUCKET_NAME
console.log(BUCKET_NAME, 'bucketname')


export default {
  signup,
  login, 
  profile
};

async function profile(req, res){
  try {
    // First find the user using the params from the request
    // findOne finds first match, its useful to have unique usernames!
    const user = await User.findOne({username: req.params.username})
    // Then find all the posts that belong to that user
    if(!user) return res.status(404).json({error: 'User not found'})

    const posts = await Post.find({user: user._id}).populate("user").exec();
    console.log(posts, ' this posts')
    res.status(200).json({data: posts, user: user})
  } catch(err){
    console.log(err)
    res.status(400).json({err})
  }
}

async function signup(req, res) {
  console.log(req.body, " <- contents of the form", req.file, ' <- this is req.file')

  if(!req.file) return res.status(400).json({error: "Please Submit a Photo"})

  // where we will store our image on aws s3 bucket
  const filePath = `pupstagram/${uuidv4()}-${req.file.originalname}`
  const params = {Bucket: BUCKET_NAME, Key: filePath, Body: req.file.buffer}; // req.file.buffer is the actually from the form when it was sent to our express server
  // s3.upload is making the request to s3
  s3.upload(params, async function(err, data){ // < inside the function in the response from aws
    if(err){
      console.log('===============================')
      console.log(err, ' <- error from aws, Probably telling you your keys arent correct')
      console.log('===============================')
      return res.status(400).json({error: 'error from aws, check your terminal'})
    }


    const user = new User({...req.body, photoUrl: data.Location}); // data.Location is the url for your image on aws
    try {
      await user.save(); // user model .pre('save') function is running which hashes the password
      const token = createJWT(user);
      res.json({ token }); // set('toJSON',) in user model is being called, and deleting the users password from the token
    } catch (error) {
      // Probably a duplicate email
      console.log(error)
      res.status(400).json(error);
    }



  }) // end of the s3 callback
} // end of signup

async function login(req, res) {
 
  try {
    // if this doesn't find anything it returns undefined
    const user = await User.findOne({email: req.body.email});
   
    if (!user) return res.status(401).json({err: 'bad credentials'});
    user.comparePassword(req.body.password, (err, isMatch) => {
      
      if (isMatch) {
        const token = createJWT(user);
        res.json({token});
      } else {
        return res.status(401).json({err: 'bad credentials'});
      }
    });
  } catch (err) {
    return res.status(401).json(err);
  }
}

/*----- Helper Functions -----*/

function createJWT(user) {
  return jwt.sign(
    {user}, // data payload
    SECRET,
    {expiresIn: '24h'}
  );
}


