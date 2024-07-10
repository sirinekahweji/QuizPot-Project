require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user');
const questionRoutes = require('./routes/question');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// Middleware
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.use('/api/user', userRoutes);
app.use('/api/question', questionRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((err) => {
    console.error(err);
});

// Define a simple route
app.get('/', (req, res) => {
    res.send('Hello, MERN Stack(BackEnd)!');
});
