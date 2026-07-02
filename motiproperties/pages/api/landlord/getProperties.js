import pool from "../../../lib/db";

export default async function handler(req, res) {

    if (req.method === "GET") {
        const { landlordID } = req.query;

        try {
            const [rows] = await pool.query(
            "SELECT * FROM properties WHERE landlordID = ?",[landlordID]
        );
        res.status(200).json(rows);
        } catch (error) {
        console.error("Error fetching properties:", error);
        res.status(500).json({ message: "Failed to fetch properties" });
        }
    } else {
        res.status(405).json({ message: "Method Not Allowed" });
  }
}