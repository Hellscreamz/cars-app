import axios from 'axios';
import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';

import { VINService } from '../../src/vin-decoder/vin-decoder.service';
jest.mock('@nestjs/config');

describe('VINService', () => {
  let vinService: VINService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VINService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    vinService = module.get<VINService>(VINService);
    configService = module.get<ConfigService>(ConfigService);
  });

  describe('getVinDetails', () => {
    it('should fetch VIN details successfully', async () => {
      const vin = '1GTG6CEN0L1139305';
      const mockApiResponse = {
        data: {
          vin,
          trims: Array.from({ length: 5 }).map(() => ({
            id: faker.vehicle.vin,
            make_model_id: faker.string,
            year: faker.string,
            name: faker.vehicle.model(),
            description: faker.vehicle.model(),
            msrp: faker.string,
            invoice: faker.string,
            created: faker.date.past().toISOString(),
            modified: faker.date.past().toISOString(),
            make_model: {
              id: faker.string,
              make_id: faker.string,
              name: faker.vehicle.manufacturer(),
              make: {
                id: faker.string,
                name: faker.vehicle.manufacturer(),
              },
            },
          })),
          specs: {
            body_class: faker.vehicle.type(),
            drive_type: faker.string,
            engine_model: faker.string,
            fuel_type_primary: faker.vehicle.fuel(),
            manufacturer_name: faker.vehicle.manufacturer(),
            steering_location: faker.string,
            transmission_speeds: faker.string,
            transmission_style: faker.string,
            vehicle_type: faker.vehicle.type(),
          },
        },
      };

      const axiosGetMock = jest.spyOn(axios, 'get');
      axiosGetMock.mockResolvedValue(mockApiResponse);

      (configService.get as jest.Mock).mockReturnValue('http://mock-api-url');

      const result = await vinService.getVinDetails({ vin });

      expect(result).toEqual(mockApiResponse.data);
      expect(axiosGetMock).toHaveBeenCalledWith(`http://mock-api-url/${vin}`);
    });

    it('should throw an error if fetching VIN details fails', async () => {
      const axiosGetMock = jest.spyOn(axios, 'get');
      axiosGetMock.mockRejectedValue(new Error('Network error'));

      try {
        await vinService.getVinDetails({ vin: 'invalid-vin' });
      } catch (error) {
        expect(error.message).toBe(
          'Error fetching VIN decoder endpoint: Network error',
        );
      }
    });
  });
});
