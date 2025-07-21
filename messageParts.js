module.exports = (text) => {

  const commandMatch = text.match(/\/(\w+)(?=\s|@|$)/);
  const command = commandMatch ? commandMatch[1] : null;

  const botNameMatch = text.match(/@(\w+)/);
  const botName = botNameMatch ? botNameMatch[1] : null;

  const extraMatch = text.match(/(?:\s)(.*)$/);
  const extra = extraMatch ? extraMatch[1].trim() : null;

  return {
    command,
    botName,
    extra,
  };
};
