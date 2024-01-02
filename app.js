import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";

const __dirname=path.resolve()

// //importing routes
import router from "./router/routes.js";
// import path from "path";

// import adminRouter from "./routes/admin.js";
// import customerRouter from "./routes/customer.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
// app.use("/image", express.static("images"));
app.use(cors());

// // Routes
app.use("/suser", router);
app.use(express.static(path.join(__dirname,"/client/build")))
app.get('*', function(_, res) {
  res.sendFile(path.join(__dirname, "/client/build/index.html"), function(err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});
// app.use("/scustomer", customerRouter);

const PORT = process.env.PORT || 5000;
const DB = process.env.DB;

mongoose
  .connect(DB)
  .then(() => {
    app.listen(PORT, () => console.log(`Server Started at PORT ${PORT}`));
  })
  .catch((error) => {
    console.log(error);
  });
