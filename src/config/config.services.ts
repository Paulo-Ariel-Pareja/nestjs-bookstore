import * as fs from 'fs';
import { parse } from 'dotenv';

export class ConfigService {
    private readonly envConfig: { [key: string]: string }

    constructor() {
        const isDevEnv = process.env.NODE_ENV !== 'production';

        if (isDevEnv) {
            const envPathFile = __dirname + '/../../.env';
            const existPath = fs.existsSync(envPathFile);

            if (!existPath) {
                console.log('.env file not exist')
                process.exit(0);
            }
            this.envConfig = parse(fs.readFileSync(envPathFile));
        } else {
            this.envConfig = {
                PORT: process.env.PORT
            }
        }
    }

    get(key: string): string {
        return this.envConfig[key];
    }
}