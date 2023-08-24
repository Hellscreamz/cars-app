import axios from 'axios';
import { Test, TestingModule } from '@nestjs/testing';
import { YearsResolver } from '../../src/years/years.resolver';
import { YearsService } from '../../src/years/years.service';
import { YearsType } from '../../src/years/years.type';
import { ConfigService } from '@nestjs/config';
import { faker } from '@faker-js/faker';
jest.mock('@nestjs/config');

describe('YearsModule', () => {
  let yearsService: YearsService;
  let yearsResolver: YearsResolver;
  let configService: ConfigService;

  beforeEach(async () => {
    configService = new ConfigService();
    yearsService = new YearsService(configService);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        YearsService,
        YearsResolver,
        {
          provide: ConfigService,
          useValue: configService,
        },
      ],
    }).compile();

    yearsResolver = module.get<YearsResolver>(YearsResolver);
  });

  describe('YearsType', () => {
    it('should create an instance of YearsType', () => {
      const yearsInput = new YearsType();
      expect(yearsInput).toBeDefined();
    });
  });

  describe('YearsService', () => {
    it('should fetch years from API', async () => {
      jest.spyOn(configService, 'get').mockReturnValue('API_URL_YEARS');

      const yearsResponse = ['2020', '2021'];
      const axiosGetMock = jest.spyOn(axios, 'get');
      axiosGetMock.mockResolvedValue({ data: yearsResponse });

      const yearsInput: YearsType = {
        make: faker.vehicle.manufacturer(),
        model: faker.vehicle.model(),
      };

      const result = await yearsService.getYears(yearsInput);

      expect(result).toEqual(yearsResponse);
    });

    it('should throw an error if API request fails', async () => {
      jest.spyOn(configService, 'get').mockReturnValue('API_URL_YEARS');

      const error = new Error('API error');
      const axiosGetMock = jest.spyOn(axios, 'get');
      axiosGetMock.mockRejectedValue(error);

      const yearsInput: YearsType = {
        make: faker.vehicle.manufacturer(),
        model: faker.vehicle.model(),
      };

      await expect(yearsService.getYears(yearsInput)).rejects.toThrow(
        `Error fetching years endpoint: ${error.message}`,
      );
    });
  });

  describe('YearsResolver', () => {
    it('should return an array of years', async () => {
      jest.spyOn(configService, 'get').mockReturnValue('API_URL_YEARS');

      const yearsResponse = ['2020', '2021'];
      const axiosGetMock = jest.spyOn(axios, 'get');
      axiosGetMock.mockResolvedValue({ data: yearsResponse });

      const yearsInput: YearsType = {
        make: faker.vehicle.manufacturer(),
        model: faker.vehicle.model(),
      };

      const result = await yearsResolver.getYears(yearsInput);

      expect(result).toEqual(yearsResponse);
    });
  });
});
