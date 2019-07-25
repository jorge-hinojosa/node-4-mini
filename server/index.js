require('dotenv').config();
const express = require('express');
const session = require('express-session');
const mc = require('./messagesController');
const {SESSION_SECRET, SERVER_PORT} = process.env;

const app = express();

app.use(express.json());

app.use(
  session({
  secret: SESSION_SECRET,
  saveUninitialized: true,
  resave: false
  })
)

app.use((req, res, next) => {
  let badWords = ['knucklehead', 'jerk', 'internet explorer'];
  if (req.body.message) {
    for (let i = 0; i < badWords.length; i++) {
      let regex = new RegExp(badWords[i], 'g');
      req.body.message = req.body.message.replace(regex, '****');
    }
    next();
  } else {
    next();
  }
});


app.get('/api/messages', mc.getAllMessages);
app.get('/api/messages/history', mc.getHistory);
app.post('/api/messages', mc.createMessage);

app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`));