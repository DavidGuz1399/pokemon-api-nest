import { Controller, Get, Param } from '@nestjs/common';
import { PokemonService } from './pokemon.service';

@Controller('api')
export class PokemonController {
    pokemonService: PokemonService;
    constructor(pokemonService: PokemonService) {
        this.pokemonService = pokemonService
    }
    @Get('/')
    index() {
        return { name: 'Api de pokemons' }
    }
    @Get('/pokemon')
    getAllPokemons() {
        return this.pokemonService.getPokemons();
    }
    @Get('/pokemon/:id')
    getPokemon(@Param('id') id: Number) {
        return this.pokemonService.getPokemon(id);
    }
    @Get('/pokemonAndTypes/:id')
    getPokemonAndTypes(@Param('id') id: Number) {
        return this.pokemonService.getPokemonAndType(id);
    }
}
