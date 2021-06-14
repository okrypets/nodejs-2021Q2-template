import { logger } from './index';

export const errorLogger = (message: string): void => {  
    process.stdout.write(message)
    logger.error(message)
};
