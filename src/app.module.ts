// app.module.ts

import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module'; // Import the SharedModule

@Module({
  imports: [SharedModule],
})
export class AppModule {}
