import path from 'path';
import express from "express";
// import dotenv from "dotenv";
import cookieParser from "cookie-parser";
// dotenv.config();
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import {notFound, errorHandler} from "./middleware/errorMiddleware.js"
import uploadRoutes from "./routes/uploadRoutes.js"

connectDB();

const port = process.env.PORT || 8000;

const app = express();
// app.use(cors());

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());



app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

const __dirname = path.resolve();
app.use('/uploads',express.static(path.join(__dirname, '/uploads')));



if (process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (err, req, res) =>
  res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')))
}else{
  app.get('/', (req, res) =>{
      res.send('running API server');
  });
}


app.use(notFound);
app.use(errorHandler);


app.listen(port, () => {
    console.log(`listening on port ${port}`);
});