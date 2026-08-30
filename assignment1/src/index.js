
import express from 'express';
import {Router} from 'express'
import cors from 'cors';

import swaggerUi from 'swagger-ui-express';

import swaggerDocument from './swagger.json' with { type: "json" };

const app = express()
const router = Router()
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors({
    origin: '*',
    credentials: true,
}))
app.use(express.json())
app.use("/",router)

const posts = [];

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.get('/api/posts', (req, res) => {
  res.json(posts);
});

app.patch('/api/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const { title, content } = req.body;  
  posts.at(postId - 1).title = title;
  posts.at(postId - 1).content = content;
  res.json(posts.at(postId - 1));   
})

app.post('/api/posts', (req, res) => {
  const { title, content } = req.body;

  
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  // Create a new post object with a simple unique ID
  const newPost = {
    id: posts.length + 1,
    title,
    content,
    createdAt: new Date().toISOString()
  };

  // Push it into the in-memory array
  posts.push(newPost);

  // Return the newly created post back to the client
  res.status(201).json(newPost);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');

} )