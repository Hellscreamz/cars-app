import { Resolver, Args, Query } from '@nestjs/graphql';
import { VINService } from './vin-decoder.service';
import { VinType, VinInput } from './vin-decoder.type';

@Resolver()
export class VinResolver {
  constructor(private readonly vinService: VINService) {}

  @Query(() => VinType)
  async getVinDetails(@Args('input') input: VinInput): Promise<any> {
    const vinDetails = await this.vinService.getVinDetails(input);
    return vinDetails;
  }
}
