import WinstonLogger from './logger.winston';
import * as morgan from 'morgan';

const stream: morgan.StreamOptions = {
    // Use the http severity
    write: (message) => WinstonLogger.http(message),
};

const skip = () => {
    const env = process.env.NODE_ENV || "development";
    return env !== "development";
};

// Build the morgan middleware
export default morgan(
    ":method :url :status :res[content-length] - :response-time ms",
    { stream, skip }
);