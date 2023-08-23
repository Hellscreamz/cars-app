// years/years.resolver.ts

import { Resolver, Query } from '@nestjs/graphql';
import { YearsService } from './years.service';

@Resolver()
export class YearsResolver {
  constructor(private readonly yearsService: YearsService) {}

  @Query(() => [String]) // Specify the return type of the query as an array of strings
  async getYears(): Promise<string[]> {
    const years = await this.yearsService.getYears();
    return years;
  }
}
