const express = require("express");
const path = require("path");
const Razorpay = require("razorpay");
const cors = require("cors");
const crypto = require("crypto");
require("dotenv").config();

const app = express();
const PORT = 5000;


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Define the path for your static files in production
const publicFolderPath = path.join(__dirname, "public");
const buildFolderPath = path.join(publicFolderPath, "build");

// Serve static files only in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(buildFolderPath));

  // Serve the main HTML file for all routes
  app.get("/*", (req, res) => {
    res.sendFile(path.join(buildFolderPath, "index.html"));
  });
}

app.post("/order", async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    const options = req.body;
    const order = await razorpay.orders.create(options);

    if (!order) {
      return res.status(500).send("Error1");
    }

    res.json(order);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error 2");
  }
});

app.post("/order/validate", async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
  //order_id + "|" + razorpay_payment_id
  sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = sha.digest("hex");
  if (digest !== razorpay_signature) {
    return res.status(400).json({ msg: "Transaction is not legit!" });
  }

  res.json({
    msg: "success",
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
  });
});


// Your other routes and middleware can go here

app.listen(PORT, () => {
  console.log("Listening on port", PORT);
});
