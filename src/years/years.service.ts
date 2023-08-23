import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
@Injectable()
export class YearsService {
  constructor(private configService: ConfigService) {}
  async getYears(): Promise<string[]> {
    const apiUrlYears = this.configService.get<string>('API_URL_YEARS');

    try {
      const response = await axios.get(apiUrlYears);
      const years = response.data;

      return years;
    } catch (error) {
      throw new Error(`Error fetching years endpoint: ${error.message}`);
    }
  }
}
