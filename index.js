const TelegramApi = require("node-telegram-bot-api");
const botOptions = require("./keyboardButtons");
const botReplies = require("./replyMessages");

const token = "ENTER YOUR TOKEN";

const bot = new TelegramApi(token, { polling: true });

const helloMessage =
  "Добрый день! Тут вы найдете ответы на все популярные вопросы. Ждем Вас на приеме.";

bot.setMyCommands([
  { command: "/start", description: "Запустить / Перезапустить бота" },
]);

const start = () => {
  bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, helloMessage, {
      reply_markup: {
        keyboard: botOptions,
        resize_keyboard: true,
        one_time_keyboard: false,
        force_reply: true,
      },
    });
  });

  bot.on("message", (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;

    if (text === "/start") {
      return;
    }
    for (let i = 0; i <= botOptions.length; i++) {
      if (text === botOptions[i][0]) {
        return bot.sendMessage(chatId, botReplies[i][0]);
      }
    }
    return bot.sendMessage(chatId, "Нет такой комманды");
  });
};

start();
