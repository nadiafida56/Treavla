import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRoute from "./router/auth.js";
import tourRoute from "./router/tours.js";
import userRoute from "./router/users.js";
import reviewRoute from "./router/review.js";
import bookingRoute from "./router/bookings.js";
import searchRoute from "./router/Search.js";
import contactRoute from "./router/contact.js";
import blogRoute from "./router/blog.js";
import commentRoute from "./router/comment.js";
import paymentRoute from "./router/payment.js";
import Stripe from 'stripe';
import verifyToken from "./utils/verifyToken.js";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT || 8000;

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

mongoose.set("strictQuery", false);

async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Database Connected");
  } catch (err) {
    console.log("MongoDB Database Connection Failed", err);
  }
}

const corsOptions = {
  origin: true,
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/tours",verifyToken, tourRoute);
app.use("/api/v1/search",verifyToken, searchRoute);
app.use("/api/v1/users",verifyToken, userRoute);
app.use("/api/v1/review",verifyToken, reviewRoute);
app.use("/api/v1/booking",verifyToken, bookingRoute);
app.use("/api/v1/contact",verifyToken, contactRoute);
app.use("/api/v1/blogs",verifyToken, blogRoute);
app.use("/api/v1/comment",verifyToken, commentRoute);
app.use("/api/v1/payments",verifyToken, paymentRoute);



app.post('/api/v1/create-payment-intent', async (req, res) => {
  const { amount, currency, tourId } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      metadata: {
        tourId,
        userId: req.user?.id,
      },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});


app.listen(port, () => {
  connect();
  console.log("Server is listening on port", port);
});