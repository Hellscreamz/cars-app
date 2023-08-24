import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { YearsType } from './years.type';

@Injectable()
export class YearsService {
  constructor(private configService: ConfigService) {}

  async getYears(input?: YearsType): Promise<string[]> {
    const apiUrlYears = this.configService.get<string>('API_URL_YEARS');

    try {
      const response = await axios.get(apiUrlYears, { params: input });
      const years = response.data;

      return years;
    } catch (error) {
      throw new Error(`Error fetching years endpoint: ${error.message}`);
    }
  }
}
