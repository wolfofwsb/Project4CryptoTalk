
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import 'dotenv/config.js'


import express from 'express'
import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
import logger from 'morgan';
import favicon  from 'serve-favicon';

import './config/database.js'

// Require controllers here
const app = express();

// console.log(assetsRouter)
// add in when the app is ready to be deployed
// app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.json()); // sets up our server to recieve JSON requests, this defines req.body for json requests
// app.use("/src", assetsRouter);
// Configure the auth middleware
// This decodes the jwt token, and assigns
// the user information to req.user
import auth from './config/auth.js'

app.use(auth); 
// api routes must be before the "catch all" route
import userRoutes from './routes/api/users.js';
import postRoutes from './routes/api/posts.js';
import likeRoutes from './routes/api/likes.js'

app.use('/api/posts',postRoutes);
app.use('/api/users', userRoutes);
app.use('/api', likeRoutes);
// "catch all" route
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const { PORT = 8000 } = process.env;
app.listen(PORT, () => {
  console.log();
  console.log(`  App running in port ${PORT}`);
  console.log();
  console.log(`  > Local: \x1b[36mhttp://localhost:\x1b[1m${PORT}/\x1b[0m`);
});
