require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // Parse JSON body

// GET Route
app.get('/bfhl', (req, res) => {
    res.status(200).json({ "operation_code": 1 });
});

// POST Route
app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;
        if (!data || !Array.isArray(data)) {
            return res.status(400).json({ is_success: false, message: "Invalid input: 'data' must be an array" });
        }

        const numbers = data.filter(item => !isNaN(item));
        const alphabets = data.filter(item => /^[A-Za-z]$/.test(item));
        const highest_alphabet = alphabets.length > 0 ? [alphabets.sort().reverse()[0]] : [];

        res.json({
            is_success: true,
            user_id: "rachit_kumar_01012000", // Your name and DOB in ddmmyyyy format
            email: "rachit@example.com",
            roll_number: "ABC123",
            numbers,
            alphabets,
            highest_alphabet
        });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ is_success: false, message: "Internal Server Error" });
    }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
