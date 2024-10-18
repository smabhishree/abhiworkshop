const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (like images)
app.use(express.static(path.join(__dirname, 'images')));

// MongoDB schema for the cart
const cartSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    address: String,
    phone: String,
    quantity: Number
});

const Cart = mongoose.model('Cart', cartSchema);

// Route to handle Add to Cart form submission
app.post('/add-to-cart', (req, res) => {
    console.log('Received data:', req.body); // Log the incoming data

    const { name, email, address, phone, quantity } = req.body;

    if (!name || !email || !address || !phone || !quantity) {
        return res.status(400).send('All fields are required.');
    }

    const newCartEntry = new Cart({
        name: name,
        email: email,
        address: address,
        phone: phone,
        quantity: quantity
    });

    newCartEntry.save()
        .then(() => {
            res.json({ success: true, message: 'Cart updated successfully!' });
        })
        .catch((error) => {
            if (error.code === 11000) {
                res.json({ success: false, message: 'Email already exists, please use another email.' });
            } else {
                console.error('Error updating cart:', error);
                res.json({ success: false, message: 'Failed to update cart.' });
            }
        });
});

// Serve the Add to Cart page
app.get('/add-to-cart', (req, res) => {
    res.sendFile(path.join(__dirname, 'add-to-cart.html'));
});

// MongoDB connection setup
mongoose.connect('mongodb://localhost:27017/cartDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB:', err));

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
