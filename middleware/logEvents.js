import { format } from "date-fns";
import { v4 } from "uuid";
import fs from 'fs';
import fsPromises from "fs/promises";
import path from 'path';

const __dirname = path.resolve();


const logEvents = async (message, logName) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd HH:mm:ss')}`;
    const logItem = `${dateTime}\t ${v4()}\t${message}\n`;
    try {
        if (!fs.existsSync(path.join(__dirname, 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, 'logs'));
        }

        await fsPromises.appendFile(path.join(__dirname, 'logs', logName), logItem);
    } catch (error) {
        console.log(error);
    }
}

const logger = (req, res, next) => {
    logEvents(
        `${req.method}\t${req.headers.origin}\t${req.url}`,
        'reqLog.txt'
    );
    next();
}

export { logger, logEvents };