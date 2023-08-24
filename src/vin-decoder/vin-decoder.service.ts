import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { VinInput } from './vin-decoder.type';

@Injectable()
export class VINService {
  constructor(private configService: ConfigService) {}

  async getVinDetails(input?: VinInput): Promise<any> {
    const apiUrlVINDecoder = this.configService.get<string>(
      'API_URL_VIN_DECODER',
    );

    try {
      const response = await axios.get(`${apiUrlVINDecoder}/${input.vin}`);
      const decodedVIN = response.data;

      return decodedVIN;
    } catch (error) {
      throw new Error(`Error fetching VIN decoder endpoint: ${error.message}`);
    }
  }
}
