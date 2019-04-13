import express from 'express';
import bodyParser from 'body-parser';
import users from './routes/api/users';


// Initialize express app
const app = express();

// body-parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

// Home page route
app.get('/', (req, res) => res.status(200).json({
  status: 200,
  data: [
    {
      message: 'Welcome to BANKA',
    },
  ],
}));

// user routes
app.use('/api/v1/auth', users);

// Handle non existing route with with proper message
app.all('*', (req, res) => res.status(404).json({
  status: 404,
  error: 'Route does not exist',
}));


// Define application port number
const port = process.env.PORT || 3000;

// Start server
app.listen(port);

// expose app to be use in another file
export default app;
