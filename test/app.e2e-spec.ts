import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import { YearsService } from './../src/years/years.service';
import { YearsResolver } from './../src/years/years.resolver';
import { YearsType } from './../src/years/years.type';
import { VINService } from './../src/vin-decoder/vin-decoder.service'; // Import VINService
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { faker } from '@faker-js/faker';
describe('Years and VINService (e2e)', () => {
  let app: INestApplication;
  let yearsService: YearsService;
  let yearsResolver: YearsResolver;
  let vinService: VINService; // Define vinService
  let configService: ConfigService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    yearsService = moduleFixture.get<YearsService>(YearsService);
    yearsResolver = moduleFixture.get<YearsResolver>(YearsResolver);
    vinService = moduleFixture.get<VINService>(VINService);
    configService = moduleFixture.get<ConfigService>(ConfigService);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('YearsModule', () => {
    it('/years (GET)', async () => {
      const input: YearsType = {
        make: 'Toyota',
        model: 'Camry',
      };

      const yearsResponse = ['2020', '2021'];
      jest.spyOn(yearsService, 'getYears').mockResolvedValue(yearsResponse);

      const result = await yearsResolver.getYears(input);

      expect(result).toEqual(yearsResponse);
    });
  });

  describe('VINService', () => {
    it('/vin/{vin} (GET) should fetch VIN details successfully', async () => {
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

      configService.get = jest.fn().mockReturnValue('http://mock-api-url');

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
