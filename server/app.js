import express from 'express';
import bodyParser from 'body-parser';


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


// Define application port number
const port = process.env.PORT || 3000;

// Start server
app.listen(port);

// expose app to be use in another file
export default app;
