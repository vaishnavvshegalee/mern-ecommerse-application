// import express from express;
import express from "express";
import cors from "cors";
import morgan from "morgan";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import connectDB from "./db.js";
import Product from "./model/productSchema.js";
import User from "./model/userSchema.js";
const app = express();
const port = 8080;

dotenv.config();
// middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// connection
connectDB();

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});

// routes
// post
app.post("/products", async (req, res) => {
  const { pid, pName, pQuantity, price } = req.body;
  try {
    const product = await Product.create({
      pid: pid,
      pName: pName,
      pQuantity: pQuantity,
      price: price,
    });
    await product.save();
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// get
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// get specific product on id
app.get("/products/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product) {
      res
        .status(404)
        .json({ message: `connot find any product with id ${id}` });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// put
app.put("/products/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) {
      res
        .status(404)
        .json({ message: `connot find any product with id ${id}` });
    }
    const updateProduct = await Product.find({ id });
    res.status(200).json(updateProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// delete
app.delete("/products/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      res
        .status(404)
        .json({ message: `connot find any product with id ${id}` });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// login route
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user)
    return res.status(400).json({ message: `invalid username and password` });
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword)
    return res.status(400).json({ message: `invalid username and password` });
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
  res.status(200).json(token);
});

// register route
app.post("/register", async (req, res) => {
  try {
    // check if user is already exist or not
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: `username already exist` });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    const user = new User({
      username,
      password: hashedPass,
    });

    // save
    const savedUser = await user.save();
    res.status(200).json({
      message: "user register successfully",
      userId: savedUser._id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
