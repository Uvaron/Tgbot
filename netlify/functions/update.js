const sendMessage = require("../../sendMessage");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }
  try {
    const { message } = JSON.parse(event.body);
    const randomNumber = Math.floor(Math.random() * 5) + 1;
    if (randomNumber === 1) {
      await sendMessage(message.chat.id, "че ты лысый");
      console.log("Received an update from Telegram!", event.body);
    }
    return { statusCode: 200, body: "OK" };
  } catch (err) {
    return { statusCode: 400, body: "Invalid JSON or missing message" };
  }
};


