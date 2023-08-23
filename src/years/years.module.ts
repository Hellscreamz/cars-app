import { Module } from '@nestjs/common';
import { YearsService } from './years.service';
import { YearsResolver } from './years.resolver';

@Module({
  providers: [YearsService, YearsResolver],
})
export class YearsModule {}
