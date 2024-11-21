const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { RequestData } = require('./requestData'); // Ensure these modules exist
const { ResponseData } = require('./responseData'); // Ensure these modules exist

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());



// app.get('/bfhl', (req, res) => {
//     try {
//         // Hardcoded response as specified
//         const response = {
//             operation_code: 1,
//         };
//         res.status(200).json(response);
//     } catch (error) {
//         // Exception handling
//         console.error('Error occurred:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// POST endpoint to process requests
app.post('/bfhl', (req, res) => {
    const request = req.body;
    const response = new ResponseData();

    response.is_success = true;
    response.user_id = "LokeshPatidar13102003";
    response.email = "lokesh2003ptdr@gmail.com";
    response.roll_number = "0827CI211105";

    const numbers = [];
    const alphabets = [];
    let isPrimeFound = false;

    // Validate request data
    if (!request.data || !Array.isArray(request.data)) {
        return res.status(400).json({ error: 'Invalid request data' });
    }

    for (const item of request.data) {
        if (isNumeric(item)) {
            numbers.push(item);
            if (isPrime(parseInt(item))) {
                isPrimeFound = true;
            }
        } else if (/^[a-zA-Z]$/.test(item)) {
            alphabets.push(item);
        }
    }

    response.numbers = numbers;
    response.alphabets = alphabets;
    response.is_prime_found = isPrimeFound;

    // Handle file validation logic here
    if (request.file_b64) {
        response.file_valid = isPrimeFound;
        const fileSizeKB = calculateBase64FileSize(request.file_b64);
        response.file_size_kb = fileSizeKB;
        response.file_mime_type = null; // Example MIME type, consider adding logic to determine the actual MIME type
    } else {
        response.file_valid = isPrimeFound;
    }

    // Find the highest lowercase alphabet
    const highestLowercase = alphabets.filter(c => c === c.toLowerCase()).reduce((first, second) => second, null);
    
    if (highestLowercase) {
        response.highest_lowercase_alphabet = [highestLowercase];
    } else {
        response.highest_lowercase_alphabet = [];
    }

    res.status(200).json(response);
});

// Utility functions
function isNumeric(str) {
    return !isNaN(str) && !isNaN(parseFloat(str));
}

function isPrime(num) {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

function calculateBase64FileSize(base64String) {
    // Base64 encoded string has extra characters, calculate original file size
    const length = base64String.length;
    return Math.ceil((length * 3) / 4 / 1024); // Convert from Base64 to KB
}

// Export the app for Vercel to use as a serverless function
module.exports = app;

// Start the server only when running locally (not on Vercel)
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}