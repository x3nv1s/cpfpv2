const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public')); // Serve static files

app.post('/register', async (req, res) => {
    const { cookies, delay } = req.body;

    try {
        // Simulate delay
        await new Promise(resolve => setTimeout(resolve, delay * 1000));

        // Fetch profile using the cookies
        const response = await axios.get('https://www.facebook.com/me', {
            headers: {
                'cookie': cookies,
                'user-agent': 'Mozilla/5.0'
            }
        });

        const profile = response.data;

        // Extract fb_dtsg value from the response (customize based on actual parsing)
        const fb_dtsg = extractFbDtsg(profile);

        // Simulating Registration logic
        const result = await registerProfile(cookies, fb_dtsg);

        res.json({ message: 'Registration successful!', result });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred', details: error.message });
    }
});

function extractFbDtsg(profile) {
    // Parse the fb_dtsg from profile data (customize based on actual response)
    return profile.includes('fb_dtsg') ? 'fb_dtsg_value' : 'error';
}

async function registerProfile(cookies, fb_dtsg) {
    // Simulate profile registration
    return { status: 'Profile created with fb_dtsg: ' + fb_dtsg };
}

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
