const express = require("express");
const errorMiddleware = require("./middleware/error")
const app = express();
const cookieParser =  require("cookie-parser")
const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload")
// app.use(express.json());
app.use(cookieParser());
app.use(express.json({limit: '50mb'}));

// Route import
const product = require("./routes/ProductRoute");
const user = require("./routes/UserRoute");
const order = require("./routes/OrderRoute");
const payment = require("./routes/paymentRoute");
const catagory = require("./routes/CatagoryRoute");
const brand = require("./routes/BrandRoute");
const store = require("./routes/StoreRoute");
app.use("/api/v1",product);
app.use("/api/v1",user);
app.use("/api/v1",order);
app.use("/api/v1",payment);
app.use("/api/v1",catagory);
app.use("/api/v1",brand);
app.use("/api/v1",store);


app.use(bodyParser.urlencoded({ extended:true }));
app.use(fileUpload());


// Middleware for Errors
app.use(errorMiddleware);
module.exports = app;