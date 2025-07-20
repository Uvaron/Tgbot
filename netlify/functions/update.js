const { exec } = require('child_process');
const path = require('path');
const tictactoePath = path.join(__dirname, '../../tictactoe'); // Правильный путь к исполняемому файлу
const sendMessage = require("../../sendMessage");
const messageParts = require("../../messageParts");

const queens = [
  { text: "🇪🇸 Ты королева Испании — когда твое платье развивается, все быки падают в обморок." },
  { text: "🇯🇵 Ты королева Японии — когда ты выходишь на улицу, цветы сакуры начинают цвести, а самураи устраивают танец в твою честь." },
  // ... остальные элементы массива
];

exports.handler = async (event) => {
  let message;

  // Попробуйте разобрать JSON и проверить наличие сообщения
  try {
    const body = JSON.parse(event.body);
    message = body.message;
  } catch (error) {
    console.error("Ошибка разбора JSON:", error);
    return { statusCode: 400, body: "Неверный формат запроса." };
  }

  if (!message || !message.text) {
    console.error("Сообщение или текст отсутствуют.");
    return { statusCode: 400, body: "Сообщение отсутствует." };
  }

  const { botName, command, extra } = messageParts(message.text);

  if (botName === "Queens_never_cry_bot" || botName === "Q") {
    switch (command) {
      case "Queens":
        const randomIndex = Math.floor(Math.random() * queens.length);
        const responseMessage = queens[randomIndex].text;
        await sendMessage(message.chat.id, responseMessage);
        break;
      case "Qecho":
        await sendMessage(message.chat.id, extra || "ECHO!");
        break;
      case "Qhelp":
        await sendMessage(message.chat.id, "Дарова, я Королевабот, напиши мне любую команду из того, что я сейчас перечислю и мы начнём!");
        await sendMessage(message.chat.id, "/Qecho @Q - для эха, /Queens @Q - узнай, какой страны ты Королева");
        break;
      case "Qgame":
        console.log(`Запуск файла: ${tictactoePath}`); // Лог для отладки
        exec(tictactoePath, (error, stdout, stderr) => {
          if (error) {
            console.error(`Ошибка: ${error.message}`);
            return;
          }
          if (stderr) {
            console.error(`Ошибка: ${stderr}`);
            return;
          }
          console.log(`Вывод: ${stdout}`);
        });
        break;
      default:
        await sendMessage(message.chat.id, "Неизвестная команда.");
    }
  }

  return { statusCode: 200 };
};
