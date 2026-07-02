import pool from "../../../lib/db";  
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  
    if (req.method === "POST") {
    const { name, email, password, role } = req.body;  // get from the request body
 

    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);


    try {
    // Insert new user into the database
    await pool.query(
    'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
    [name, email, hashedPassword, role]
    );
    
        //A simple alert that the addition was successful
        res.status(200).json({ message: "User registered succesfully" });
    } catch (error) {
        console.error('Error during user registration:', error);
        res.status(500).json({ message: "Internal server error" });
        }
    } else {
        res.status(405).json({ message: "Method Not Allowed" });
    }
}
