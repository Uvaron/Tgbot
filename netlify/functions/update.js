const sendMessage = require("../../sendMessage");

exports.handler = async (event) => {
  const { message } = JSON.parse(event.body);
  // Generate a random number between 1 and 5
  const randomNumber = Math.floor(Math.random() * 5) + 1;
  // Check if the random number is 1
  if (randomNumber === 1) {
  await sendMessage(message.chat.id, "че ты лысый");
  console.log("Received an update from Telegram!", event.body);}





  
  
  

  return { statusCode: 200 };
};


