const db = require("../db/query");
exports.getMessages = async () => {
  const queryResult = await db.getAllMessages();
  console.log(queryResult);
  return queryResult;
};

exports.getUsers = async () => {
  const queryResult = await db.getUsers();
  return queryResult;
};
