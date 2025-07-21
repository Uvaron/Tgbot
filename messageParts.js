module.exports = (text) => {
  if (!text) {
    return { command: null, botName: null, extra: null };
  }

  const commandMatch = text.match(/(?<=\/)\w+/);
  const command = commandMatch ? commandMatch[0] : null;

  const botNameMatch = text.match(/(?<=@)\w+/);
  const botName = botNameMatch ? botNameMatch[0] : null;

  const extraMatch = text.match(/(?<=\s).+/);
  const extra = extraMatch ? extraMatch[0].trim() : null;

  return {
    command,
    botName,
    extra,
  };
};
