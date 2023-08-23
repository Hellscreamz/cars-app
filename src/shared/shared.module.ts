import { Module } from '@nestjs/common';
import { SharedModuleImports } from './imports';
import { SharedModuleProviders } from './providers';
import { SharedModuleExports } from './exports';

@Module({
  imports: [...SharedModuleImports],
  providers: [...SharedModuleProviders],
  exports: [...SharedModuleExports],
})
export class SharedModule {}
