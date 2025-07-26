import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import returningCustomersRouter from './routes/returningCustomers.js'; // Import the new route

// App Config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// CORS Setup
const allowedOrigins = [
  'https://www.elabyaashima.com',
  'https://admin.elabyaashima.com',
  'https://website-ela.vercel.app',
  'https://admin-ela.vercel.app',
  'http://localhost:5173'
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (e.g. mobile apps or curl requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS policy: This origin is not allowed.'));
    }
  },
  credentials: true, // Allow cookies, Authorization headers, etc.
};

// Middlewares
app.use(express.json());
app.use(cors(corsOptions));

// API Endpoints
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
app.use('/api/returningCustomers', returningCustomersRouter);

// Default Route
app.get('/', (req, res) => {
    res.send("API Working");
});

app.get('/hello', (req, res) => {
    res.send("ok");
});

// Start the Server
app.listen(port, () => console.log(`Server started on PORT: ${port}`));
