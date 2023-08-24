import { Resolver, Query, Args } from '@nestjs/graphql';

import { YearsService } from './years.service';
import { YearsType } from './years.type';

@Resolver()
export class YearsResolver {
  constructor(private readonly yearsService: YearsService) {}

  @Query(() => [String])
  async getYears(
    @Args('input', { nullable: true }) input?: YearsType,
  ): Promise<string[]> {
    const years = await this.yearsService.getYears(input);
    return years;
  }
}
