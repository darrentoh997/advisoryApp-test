import dotenv from "dotenv";
dotenv.config();
import express, { Application } from "express";
import cors from "cors";
import authRoutes from "./routes/auth";
import listingRoutes from "./routes/listing";

const app: Application = express();
const port = 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/listing", listingRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
