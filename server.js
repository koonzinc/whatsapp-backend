// importing
import express from 'express';
import mongoose from 'mongoose';
import Messages from './dbMessages.js';
import Pusher from 'pusher';
// app config
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
    appId: "1498745",
    key: "d19ae92716e4ba25ca72",
    secret: "9fa7295c11a9bec62a90",
    cluster: "us2",
    useTLS: true
  });

// middleware 
app.use(express.json());

// database config
const connection_url = 'mongodb+srv://koonzinc:SL484W02rgEpMXkO@cluster0.rdupyvg.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(connection_url)

// ????

// api routes
app.get('/', (req, res) => res.status(200).send('Hello world'));

app.get('/messages/sync', (req, res) => {
    Messages.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

app.post('/messages/new', (req, res) => {
    const dbMessage = req.body
    Messages.create(dbMessage, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})
// listener
app.listen(port, () => console.log(`Listening on localhost:${port}`));





// SL484W02rgEpMXkO

// mongodb+srv://koonzinc:SL484W02rgEpMXkO@cluster0.rdupyvg.mongodb.net/?retryWrites=true&w=majority