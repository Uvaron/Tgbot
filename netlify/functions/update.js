const sendMessage = require("../../sendMessage");
const messageParts = require("../../messageParts");

exports.handler = async (event) => {
  const { message } = JSON.parse(event.body);
  const { command, botName, extra } = messageParts(message.text);

  if (botName === "partiibot" || botName === null) {
    switch (command) {
  case "echo":
    await sendMessage(message.chat.id, extra || "ECHO!");
    break;
  default:
    await sendMessage(message.chat.id, "I don't understand that command.");
}
  }

  return { statusCode: 200 };
};


