import pool from "../../../lib/db";

export default async function deleteUser(req, res) {
  const { id } = req.query;

  try {
    const [result] = await pool.query("DELETE FROM users WHERE id = ?", [id]);
    res.status(200).json({ message: "Property deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting property" });
  }
}