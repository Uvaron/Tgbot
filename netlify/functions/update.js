const sendMessage = require("../../sendMessage");
const messageParts = require("../../messageParts");

const queens = [
  { text: "🇪🇸 Ты королева Испании — когда твое платье развивается, все быки падают в обморок." },
  { text: "🇯🇵 Ты королева Японии — когда ты выходишь на улицу, цветы сакуры начинают цвести, а самураи устраивают танец в твою честь." },
  // ... другие страны
];

exports.handler = async (event) => {
    const body = JSON.parse(event.body);
    if (!body || !body.message || !body.message.text) {
      throw new Error("Invalid message structure");
    }

    const { message } = body;
    const { command, botName, extra } = messageParts(message.text);

    if (botName === "Queens_never_cry_bot" || botName === "Q" || (command === "duel" && botName === "")) {
      switch (command) {
        case "queens":
          const randomIndex = Math.floor(Math.random() * queens.length);
          const responseMessage = queens[randomIndex].text;
          await sendMessage(message.chat.id, responseMessage);
          break;
        case "qecho":
          await sendMessage(message.chat.id, extra || "ECHO!");
          break;
        case "qhelp":
          await sendMessage(message.chat.id, "Дарова, я Королевабот, напиши мне любую команду из того, что я сейчас перечислю и мы начнём!");
          await sendMessage(message.chat.id, "/Qecho @Q - для эха, /Queens @Q - узнай, какой страны ты Королева");
          break;
        case "duel":
          if (!extra) {
            await sendMessage(message.chat.id, "Пожалуйста, укажите пользователя для дуэли.");
            break;
          }
          const duelTarget = extra.trim();
          await sendMessage(message.chat.id, `Привет, ${duelTarget}, ты вызван на дуэль!`);

          // Отправить сообщение вызываемому пользователю
          await sendMessage(duelTarget, `Вы вызваны на дуэль от @${message.from.username || "некого"}`);
          break;
        default:
          await sendMessage(message.chat.id, "Я не понимаю эту команду.");
      }
    }
};

  return { statusCode: 200 };
};
