import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const users = [];
const tweets = [];

app.post('/sign-up', (req, res) => {
    const { username, avatar } = req.body;

    if ((!username) || (!avatar) || (typeof username !== 'string') || (typeof avatar !== 'string')) {
        return res.status(400).send("Todos os campos são obrigatórios!");
    }

    const newUser = { username, avatar };
    users.unshift(newUser);
    res.status(201).send("OK");
});

app.post('/tweets', (req, res) => {
    const { username, tweet } = req.body;
    const user = users.find(x => x.username === username);

    if ((!username) || (!tweet) || (typeof username !== 'string') || (typeof tweet !== 'string')) {
        return res.status(400).send("Todos os campos são obrigatórios!");
    }

    if (!user) {
        return res.status(401).send("UNAUTHORIZED");
    }

    const newTweet = { username, tweet }
    newTweet.avatar = users.find(x => x.username === username).avatar;
    tweets.unshift(newTweet);
    res.status(201).send("OK");
});

app.get('/tweets', (req, res) => {
    let lastTweets = tweets.slice(0, 10);

    const page = Number(req.query.page);
    if (page) {
        if (Number.isInteger(page) && page >= 1) {
            lastTweets = tweets.slice((page - 1) * 10, page * 10);
        } else {
            return res.status(400).send("Informe uma página válida!");
        }
    }

    res.send(lastTweets);
});

app.get('/tweets/:username', (req, res) => {
    const { username } = req.params;
    const userTweets = tweets.filter(x => x.username === username);
    res.send(userTweets);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Running server on port ${PORT}`));