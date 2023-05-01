const winston = require('winston');
require('winston-daily-rotate-file');

const level = process.env.LOGLEVEL || 'info';
const dateFormat = () => new Date(Date.now()).toISOString();
const transport = new winston.transports.DailyRotateFile({
  level,
  filename: './logs/application-%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '10m',
  maxFiles: '15d',
});

const logger = winston.createLogger({
  transports: [transport],
  format: winston.format.printf(info => {
    const message = `${dateFormat()} | ${info.level.toUpperCase()} | ${info.name} | ${
      info.unique
    } | ${info.message}`;
    return message;
  }),
  exitOnError: false,
});

function logging(name, unique = '') {
  return {
    error: async message => {
      logger.error({
        name,
        unique,
        message,
      });
    },
    info: async message => {
      logger.info({
        name,
        unique,
        message,
      });
    },
    debug: async message => {
      logger.debug({
        name,
        unique,
        message,
      });
    },
  };
}

export const init = 'Initiated';
export const responded = 'Responded Successfully';
export default logging;
