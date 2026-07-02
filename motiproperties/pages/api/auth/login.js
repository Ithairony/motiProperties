import pool from "../../../lib/db";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST allowed" });
  }

  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ message: "Missing credentials" });
  }

  try {
    // Check if user exists by comparing email and role 
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE email = ? AND role = ?",
      [email, role]
    );

    if (rows.length !== 1) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = rows[0];

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Set session cookie
    const cookieValue = encodeURIComponent(
      JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      })
    );
                                                // keeps cookies for 2 hours
    res.setHeader("Set-Cookie", `user=${cookieValue}; Path=/; Max-Age=7200; HttpOnly`);

    return res.status(200).json({ message: "Login successful" });

  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}