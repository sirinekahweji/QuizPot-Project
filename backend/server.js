const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const userRoutes=require('./routes/user')


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
//middleware
app.use(express.json());

app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next();
})
app.use('/api/user',userRoutes)


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error(err);
});

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello, MERN Stack(BackEnd)!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
