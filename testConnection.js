// testConnection.js
const { Sequelize } = require('sequelize');
const dbConfig = require('./config/config.json').development; // используем конфигурацию для dev

// Создаем экземпляр Sequelize с использованием настроек из config.json
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect
});

// Функция для проверки соединения с базой данных
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Соединение с базой данных успешно установлено!');
  } catch (error) {
    console.error('Ошибка соединения с базой данных:', error);
  } finally {
    await sequelize.close();
  }
};

testConnection();
