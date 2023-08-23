import { Resolver, Query } from '@nestjs/graphql';
import { YearsService } from './years.service';

@Resolver()
export class YearsResolver {
  constructor(private readonly yearsService: YearsService) {}

  @Query(() => [String])
  async getYears(): Promise<string[]> {
    const years = await this.yearsService.getYears();
    return years;
  }
}
