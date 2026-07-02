import pool from "../../../lib/db";

export default async function handler(req, res) {
  try {
    const [rows] = await pool.query("SELECT * FROM properties");
    res.status(200).json(rows);
  } catch (error) {
    console.error("DB error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
