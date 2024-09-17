import { Controller, Get } from '@nestjs/common';

@Controller('')
export class AppController {
    @Get('/')
    index() {
        return {
            urlPokemons: '/api/pokemon',
            urlPokemon: '/api/pokemon/:id',
            urlPokemonAndTypes: '/api/pokemonAndTypes/:id',
        }
    }
}