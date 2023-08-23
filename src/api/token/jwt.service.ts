import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokenService {
  constructor(private configService: ConfigService) {}

  async fetchJwtToken(): Promise<string> {
    const apiJWTUrl = this.configService.get<string>('API_URL_JWT');
    const apiToken = this.configService.get<string>('API_TOKEN');
    const apiSecret = this.configService.get<string>('API_SECRET');

    const requestBody = {
      api_token: apiToken,
      api_secret: apiSecret,
    };

    try {
      const response = await axios.post(apiJWTUrl, requestBody);
      const token = response.data;

      return token;
    } catch (error) {
      throw new Error(`Error obtaining JWT token: ${error.message}`);
    }
  }
}
