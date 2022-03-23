import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js'
import products from './data/products.js';
// import all user models
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';


dotenv.config();

connectDB()


const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUser = await User.insertMany(users);

    // get admin user from createdUser array
    const adminUser = createdUser[0]._id;

    const sampleProducts = products.map(product => {
      return {
        ...product,
        user: adminUser
      }
    });

    await Product.insertMany(sampleProducts);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1);
  }
}




const destroytData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1);
  }
}


// to get the -d on terminal to mean destroy
if (process.argv[2] === '-d') {
  destroytData()
} else {
  importData();
}

