import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const users = [];
const tweets = [];

app.post('/sign-up', (req, res) => {
    const { username, avatar } = req.body;

    const newUser = { username, avatar };
    users.unshift(newUser);
    res.send("OK");
});

app.post('/tweets', (req, res) => {
    const { username, tweet } = req.body;
    const user = users.find(x => x.username === username);
    if (!user) {
        return res.send("UNAUTHORIZED");
    }

    const newTweet = { username, tweet }
    newTweet.avatar = users.find( x => x.username === username).avatar;
    tweets.unshift(newTweet);
    res.send("OK");
});

app.get('/tweets', (req, res) => {
    const lastTweets = tweets.slice(0,10);
    res.send(lastTweets);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Running server on port ${PORT}`));