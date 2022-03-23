import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

import productRoutes from './routes/productRoutes.js';


dotenv.config();

connectDB();

const app = express();



// example for what middlware is
// app.use((req, res, next) => {
//   console.log('HEEEEEEEELLLLLLLOOOOOOOO');
//   next();
// })



app.get('/', (req, res) => {
  res.send('API IS RUNNING...')
});


app.use('/api/products', productRoutes);


// middleware aka next() but is being imported from middleware/errorMIddlware
app.use(notFound)
app.use(errorHandler)



const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));