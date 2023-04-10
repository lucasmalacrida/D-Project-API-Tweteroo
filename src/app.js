import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const users = [];
const tweets = [];

app.get('/tweets', (req, res) => {
    res.send("GET Tweets");
});

app.post('/sign-up', (req, res) => {
    const { username, avatar } = req.body;
    const newUser = { username, avatar };
    users.push(newUser);
    res.send("OK");
});

app.post('/tweets', (req, res) => {
    const body = req.body;
    res.send("POST Tweets");
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Running server on port ${PORT}`));