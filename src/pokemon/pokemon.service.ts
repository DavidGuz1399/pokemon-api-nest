import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { catchError, lastValueFrom, map } from 'rxjs';

@Injectable()
export class PokemonService {
    constructor(private readonly httpService: HttpService) { }
    async getPokemons() {
        try {
            // Example of a GET request
            const response = await lastValueFrom(
                this.httpService.get('https://pokeapi.co/api/v2/pokemon').pipe(
                    map((res) => res.data),
                    catchError((error) => {
                        throw new Error(`Failed to fetch data: ${error.message}`);
                    }),
                ),
            );
            const { results } = response
            return { results: results };
        } catch (error) {
            throw new Error(error.message);
        }
    }
    async getPokemon(id) {
        try {
            // Example of a GET request
            const response = await lastValueFrom(
                this.httpService.get(`https://pokeapi.co/api/v2/pokemon/${id}`).pipe(
                    map((res) => res.data),
                    catchError((error) => {
                        throw new Error(`Failed to fetch data: ${error.message}`);
                    }),
                ),
            );
            const { name, types } = response

            return { name: name, types: types };
        } catch (error) {
            throw new Error(error.message);
        }
    }
    async getPokemonAndType(id) {
        try {
            // Example of a GET request
            const response = await lastValueFrom(
                this.httpService.get(`https://pokeapi.co/api/v2/pokemon/${id}`).pipe(
                    map((res) => res.data),
                    catchError((error) => {
                        throw new Error(`Failed to fetch data: ${error.message}`);
                    }),
                ),
            );
            const { name, types } = response
            const translations = await Promise.all(
                types.map(async ({ type }) => {
                    //console.log(type)
                    const typeResponse = await lastValueFrom(
                        this.httpService.get(`${type.url}`).pipe(
                            map((res) => res.data),
                            catchError((error) => {
                                throw new Error(`Failed to fetch data: ${error.message}`);
                            }),
                        ),
                    );
                    const translatedName = typeResponse.names.filter(nameObj => nameObj.language.name === 'es' || nameObj.language.name === 'ja');
                    return translatedName;
                })
            );
            //console.log(translations)
            types.forEach((typeObj, index) => {
                const translationsObject = translations[index];

                // Add the translations to the type object
                typeObj.type.names = translationsObject;
            });

            return { name: name, types: types };
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
