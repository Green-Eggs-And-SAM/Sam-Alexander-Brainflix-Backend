const express = require('express');
const app = express();
const routes = require('./routes/videos');
const cors = require('cors');

const PORT = 5555;
app.use(express.json()); // parse incoming requests with JSON payloads
app.use(express.static('public')); // serve static files from the 'public' folder
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello API routes. Demo');
});

app.use(routes);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
