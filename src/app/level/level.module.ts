import { DynamicModule, Module } from '@nestjs/common'
import { LevelService } from './level.service'

@Module({
  imports: [],
  providers: [LevelService],
  exports: [LevelService],
})
export class LevelModule {
  static forRoot({ isGlobal = false }: { isGlobal?: boolean }): DynamicModule {
    return {
      module: LevelModule,
      global: isGlobal,
    }
  }
}
