import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { Logger } from '@nestjs/common';

export class ConfigService {
  private readonly envConfig: { [key: string]: any };

  private readonly logger = new Logger(ConfigService.name);

  constructor() { 
    this.envConfig = {};
    const envFile = process.env.NODE_ENV === 'production' ? '.env.prod' : process.env.NODE_ENV === 'development' ? '.env.dev' : '.env';
    this.logger.log("ConfigService > envFile :: " + envFile);
    this.envConfig = dotenv.parse(fs.readFileSync(envFile));
    // const envFile = process.env.NODE_ENV === 'production' ? '.env.prod' : env === 'development' ? '.env.dev' : '.env';
    const appEnv = this.get('APP_ENV');
    this.logger.log("ConfigService > appEnv :: " + appEnv);
  }

  getApiUrl(environment: 'live' | 'sandbox') {
    return environment === 'sandbox' ? 'https://api-m.sandbox.paypal.com' : 'https://api-m.paypal.com';
  }

  get(key: string): any {
    return this.envConfig[key];
  }

  isEnv(env: string): boolean {
    return this.nodeEnv === env;
  }

  get nodeEnv(): string {
    return process.env.NODE_ENV || 'development';
  }
}
