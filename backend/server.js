import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';


dotenv.config();

connectDB();

const app = express();

// lets us use json data in the body to get login data
app.use(express.json())


// example for what middlware is
// app.use((req, res, next) => {
//   console.log('HEEEEEEEELLLLLLLOOOOOOOO');
//   next();
// })



app.get('/', (req, res) => {
  res.send('API IS RUNNING...')
});


app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);


// middleware aka next() but is being imported from middleware/errorMIddlware
app.use(notFound)
app.use(errorHandler)



const PORT = process.env.PORT || 5000


app.listen(PORT, console.log(`Server in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));