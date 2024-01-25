const express = require('express');
const connectToMongoDB = require('./mongo');

const app = express();
const port = 8000;

// Wrap the code in an async function to use await
(async () => {
    // Destructure the result of connectToMongoDB
    const { client, collection } = await connectToMongoDB();

    app.get('/user/:username', async (req, res) => {
        try {
            const { username } = req.params;

            // Use collection.find to query MongoDB
            const user = await collection.findOne({ username });

            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            console.error('Error in request:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    // Endpoint to get user by user ID
    app.get('/user/id/:userId', async (req, res) => {
        try {
            const { userId } = req.params;

            // Use collection.find to query MongoDB
            const user = await collection.findOne({ id: parseInt(userId) });

            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            console.error('Error in request:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    app.listen(port, () => {
        console.log(`Server listening at http://localhost:${port}`);
    });
})();
