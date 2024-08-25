const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  // Import the CORS package

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());  // Enable CORS for all routes

app.post('/bfhl', (req, res) => {
    const { data } = req.body;

    // Validate input
    if (!Array.isArray(data)) {
        return res.status(400).json({ is_success: false, error: "Invalid input format" });
    }

    const numbers = [];
    const alphabets = [];
    let highestLowercaseAlphabet = "";

    data.forEach(item => {
        if (!isNaN(item)) {
            numbers.push(item);
        } else if (typeof item === 'string' && item.length === 1) {
            alphabets.push(item);
            if (item >= 'a' && item <= 'z') {
                if (item > highestLowercaseAlphabet) {
                    highestLowercaseAlphabet = item;
                }
            }
        }
    });

    const userId = "your_fullname_ddmmyyyy"; // Replace with your actual name and DOB
    const email = "your_college_email@domain.com"; // Replace with your actual college email
    const rollNumber = "your_roll_number"; // Replace with your actual roll number

    res.json({
        is_success: true,
        user_id: userId,
        email: email,
        roll_number: rollNumber,
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet ? [highestLowercaseAlphabet] : []
    });
});

app.get('/bfhl', (req, res) => {
    res.json({
        operation_code: 1
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
