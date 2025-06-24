const axios = require('axios');

exports.handler = async function(event, context) {
  // Проверяем, что это POST запрос
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ success: false, error: 'Method not allowed' })
    };
  }

  try {
    // Получаем данные из тела запроса
    const { name, email, message } = JSON.parse(event.body);

    // Проверяем наличие всех полей
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, error: 'Missing required fields' })
      };
    }

    // Получаем токены из переменных окружения
    const TOKEN = process.env.TG_TOKEN;
    const CHAT_ID = process.env.TG_CHAT_ID;

    if (!TOKEN || !CHAT_ID) {
      console.error('Missing Telegram credentials');
      return {
        statusCode: 500,
        body: JSON.stringify({ success: false, error: 'Server configuration error' })
      };
    }

    // Формируем сообщение для Telegram
    const telegramMessage = `<b>Заявка с сайта</b>\n` +
      `<b>Имя:</b> ${name}\n` +
      `<b>Email:</b> ${email}\n` +
      `<b>Сообщение:</b> ${message}`;

    // Отправляем сообщение в Telegram
    const response = await axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      parse_mode: 'html',
      text: telegramMessage
    });

    if (response.data.ok) {
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true })
      };
    } else {
      console.error('Telegram API error:', response.data);
      return {
        statusCode: 500,
        body: JSON.stringify({ success: false, error: 'Telegram API error' })
      };
    }

  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: 'Internal server error' })
    };
  }
}; 