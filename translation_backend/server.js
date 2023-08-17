import express from 'express';
import https from 'https';
import cors from "cors";

const app = express();

const options = {
    key: fs.readFileSync('./privkey5.pem'),
    cert: fs.readFileSync('./cert5.pem'),
}

const server = https.createServer(options, app);

const port = 8091;

const getUrl = (from, to, text) => {
    return 'https://api.pawan.krd/gtranslate?from=' + from + '&to=' + to + '&text=' + text;
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/:from/:to/:text', async (req, res) => {
    const response = await fetch(getUrl(req.params.from, req.params.to, req.params.text));
    const result = await response.json();

    res.json(result);
});

server.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});