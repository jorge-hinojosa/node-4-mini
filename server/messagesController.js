let messages = [];

module.exports = {
  getAllMessages: (req, res) => {
    res.status(200).send(messages);
  },
  createMessage: (req, res) => {
    const {username, message} = req.body;
    // const {session} = req;
    // console.log(session)
    let newMessage = {
      username, message
    }
    messages.push(newMessage)

    if (req.session.history) {
      req.session.history.push(newMessage)
    } else {
      req.session.history = [];
      req.session.history.push(newMessage)
    }

    res.status(200).send(messages)
  },
  getHistory: (req, res) => {
    res.status(200).send(req.session.history)
  }
}