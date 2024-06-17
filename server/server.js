import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pg from "pg";

dotenv.config();
const dbCString = process.env.DATABASE_URL;
export const db = new pg.Pool({
  connectionString: dbCString,
});
const app = express();
app.use(cors());
app.use(express.json());
const port = 8080;
app.listen(port, () => {
  console.log(`Your server is runnig on port ${port}`);
});
app.get("/", (req, res) => {
  res.json({ Reply: "Root route successfully tested!" });
});
