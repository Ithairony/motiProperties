import pool from "../../../lib/db";

export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const {
        // tenantID,
        // propertyID,
        firstName,
        lastName,
        email,
        phone,  
        occupation, 
        monthlyIncome,
    } = req.body;

    // Validating all fields 
    if (!firstName || !lastName || !email || !phone || !occupation || !monthlyIncome ) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Try to insert data into the applications table 
    try {
        // Inserir os dados no banco de dados
        const [result] = await pool.query(
        "INSERT INTO applications ( firstName, lastName, email, phone, occupation, monthlyIncome) VALUES ( ?, ?, ?, ?, ?, ?)",
        [
          //  tenantID,
          // propertyID,
            firstName,
            lastName,
            email,
            phone,
            occupation,
            monthlyIncome,
        ]
        );

        // If inserted 
        res.status(201).json({ message: "Application successfully submitted!" });
    } catch (error) {
        console.error("DB error:", error.message);
        res.status(500).json({ message: "Failed to submit application" })
    }
}