import { Module } from '@nestjs/common';
import { PokemonController } from './pokemon.controller';
import { HttpModule } from '@nestjs/axios';
import { PokemonService } from './pokemon.service';

@Module({
  imports: [HttpModule],
  controllers: [PokemonController],
  providers: [PokemonService]
})
export class PokemonModule { }
