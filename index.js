import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import productRoute from "./routes/product.route.js";
import Product from "./models/product.models.js";

const app = express();
const port = 3000;

dotenv.config();
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

//routes
app.use("/products", productRoute);  

// Home route
app.get("/", (req, res) => {
  res.send("<h1 style='text-align:center'>Products Details</h1>");
});

// MongoDB connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.byhiscf.mongodb.net/Prac`;

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(uri);
    console.log("connection to the data base established");
  } catch (err) {
    console.log("mongoDB connection", err);
    process.exit(1);
  }
};

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`server is running on ${port}`);
    });
  })
  .catch((err) => {
    console.log("mongodb connection error", err);
  });







