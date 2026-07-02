import pool from "../../../lib/db";

export default async function updateUsers(req, res) {
  const { id, name, email, role } = req.body;

   try {
    const [result] = await pool.query(
      "UPDATE users SET id = ?, name = ?, email = ?, role = ? ",
      [id, name, email, role]
    );

    if (result.affectedRows > 0) {
      return res.status(200).json({ message: "User updated successfully!" });
    } else {
      return res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating user" });
  }
}