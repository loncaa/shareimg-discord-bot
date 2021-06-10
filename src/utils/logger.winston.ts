
import * as winston from 'winston';

const NODE_ENV = process.env['NODE_ENV'];

export default winston.createLogger({
    level: NODE_ENV === 'development' ? 'debug' : 'info',
  format: winston.format.combine(
    NODE_ENV === 'development' ? winston.format.colorize() : winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.printf(({ level, message }) => `${level}: ${message}`)
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ['error'],
    }),
  ],
})