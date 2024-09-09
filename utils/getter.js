const db = require("../db/query");
exports.getMessages = async () => {
  const queryResult = await db.getAllMessages();

  const messages = [];
  for (const message of queryResult) {
    const author = await this.getAuthor(message.user_id);
    let title = author + " - " + message.title;
    messages.push({
      ...message,
      title,
    });
  }
  return messages;
};

exports.getAuthor = async (userId) => {
  const queryResult = await db.getUserById(userId);
  const author = queryResult[0].first_name + " " + queryResult[0].last_name;
  return author;
};
