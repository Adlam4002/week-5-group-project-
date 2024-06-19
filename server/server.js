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

// Here's the route to post form data to the database.
app.post("/submit", async (req, res) => {
  const { category, task, priority, complete_by } = req.body;
  try {
    await db.query(
      `
    INSERT INTO tasklist (complete, category, task , priority, complete_by)
    VALUES  ($1, $2, $3, $4, $5)
    `,
      [false, category, task, priority, complete_by]
    );
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("You have failedto submit", error);
    res.status(500).json({ success: false });
  }
});
// Here's the route to get the taskData from the databse
app.get("/gettasks", async (req, res) => {
  const result = await db.query(`
    SELECT id, complete, category, task , priority, complete_by FROM tasklist
    `);
  res.json(result.rows);
});
// Ratch route to change the complete value of a row
app.patch("/complete", async (req, res) => {
  const { id } = req.body;
  try {
    await db.query(
      `
    UPDATE tasklist
SET complete = true
WHERE id = $1`,
      [id]
    );
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("You have failedto submit", error);
    res.status(500).json({ success: false });
  }
});
