
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const dotenv = require('dotenv');
const morgan = require('morgan');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configure Handlebars
app.engine('.hbs', exphbs.engine({ extname: '.hbs', defaultLayout: 'index' }));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true })); // Handle form data
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files
app.use(morgan('dev')); // Logging

const categories = [
    { id: 1, name: 'Technology' },
    { id: 2, name: 'Gaming' },
    { id: 3, name: 'Fashion' },
    { id: 4, name: 'Education' },
    { id: 5, name: 'Wellness' },
];

const items = [
    { id: 1, name: 'Item 1', price: 10.00, category: 'Technology' },
    { id: 2, name: 'Item 2', price: 20.00, category: 'Gaming' },
    { id: 3, name: 'Item 3', price: 30.00, category: 'Fashion' },
];

// Routes
app.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

app.get('/addPost', (req, res) => {
    res.render('addPost', { title: 'Add Post', categories });
});

app.post('/posts/add', (req, res) => {
    const { title, body, category, published } = req.body;
    console.log('New post added: ${title}, ${category}, Published: ${published ? true : false}');
    // Normally, save to a database here
    res.redirect('/');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

app.get('/shop', (req, res) => {
    res.render('shop', { title: 'Shop', items });
});

app.get('/items', (req, res) => {
    res.render('items', { title: 'Items', items });
});

app.get('/categories', (req, res) => {
    res.render('categories', { title: 'Categories', categories });
});

// 404 Error page
app.use((req, res) => {
    res.status(404).render('error', { title: '404 - Page Not Found', message: 'The page you are looking for does not exist.' });
});

// Start the server
app.listen(PORT, () => {
    console.log('Server is running on http://localhost:${PORT}');
});