import * as dotenv from "dotenv";
dotenv.config({ path: "./../.env" });
import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import routes from "./routes/routes";
import { connectDB } from "./db/db";

const app = express();
const cors = require("cors");
// Apply middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());
//
connectDB();
// Apply routes

app.use("/", routes);

// Start server
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
