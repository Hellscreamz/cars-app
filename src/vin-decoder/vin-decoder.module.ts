import { Module } from '@nestjs/common';
import { VINService } from './vin-decoder.service';
import { VinResolver } from './vin-decoder.resolver';

@Module({
  providers: [VINService, VinResolver],
})
export class VINDecoderModule {}
