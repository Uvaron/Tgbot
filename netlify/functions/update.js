const { exec } = require('child_process');
const fs = require('fs');
const os = require('os'); // For platform detection

// C file and executable names
const cFile = 'hello.c';
const executable = os.platform() === 'win32' ? 'hello.exe' : './hello'; // Cross-platform support

const sendMessage = require("../../sendMessage");
const messageParts = require("../../messageParts");

// List of queen messages
const queens = [
  { text: "🇪🇸 Ты королева Испании — когда твое платье развивается, все быки падают в обморок." },
  { text: "🇯🇵 Ты королева Японии — когда ты выходишь на улицу, цветы сакуры начинают цвести, а самураи устраивают танец в твою честь." },
  // Other messages...
];

exports.handler = async (event) => {
  let message;

  // Try to parse the incoming JSON and extract the message
  try {
    const body = JSON.parse(event.body);
    message = body.message;
  } catch (error) {
    console.error("Ошибка разбора JSON:", error);
    return { statusCode: 400, body: "Неверный формат запроса." };
  }

  const { botName, command, extra } = messageParts(message.text || "");

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
        try {
          const output = await runExecutable();
          await sendMessage(message.chat.id, `Program output: ${output}`);
        } catch (error) {
          console.error("Error during C program execution:", error);
          await sendMessage(message.chat.id, "An error occurred while executing the program.");
        }
        break;

      default:
        await sendMessage(message.chat.id, "Неизвестная команда.");
    }
  }

  return { statusCode: 200 };
};

// Refactored runExecutable to return a Promise
function runExecutable() {
  return new Promise((resolve, reject) => {
    // Step 1: Compile the C file
    exec(`gcc ${cFile} -o ${executable}`, (compileError, compileStdout, compileStderr) => {
      if (compileError) {
        console.error(`Compilation error: ${compileStderr}`);
        return reject(new Error("Failed to compile C program."));
      }

      console.log('Compilation successful!');

      // Step 2: Execute the compiled C program
      exec(executable, (execError, execStdout, execStderr) => {
        if (execError) {
          console.error(`Execution error: ${execStderr}`);
          return reject(new Error("Failed to execute C program."));
        }

        console.log('C program output:', execStdout);
        resolve(execStdout.trim());
      });
    });
  });
}
