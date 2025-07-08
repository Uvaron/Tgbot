const axios = require("axios");

exports.handler = async (event) => {
  console.log("Received an update from Telegram!", event.body);

  // Generate a random number between 1 and 5
  const randomNumber = Math.floor(Math.random() * 5) + 1;

  // Check if the random number is 1
  if (randomNumber === 1) {
    await axios.post(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
      chat_id: JSON.parse(event.body).message.chat.id,
      text: "х",
    });
  } else {
    console.log("Random number is not 1. No message sent.");
  }

  return { statusCode: 200 };
};


