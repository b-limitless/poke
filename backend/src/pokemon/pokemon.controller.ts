import { Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { PokemonService } from './pokemon.service';


import axios from 'axios';
import { fetchPokemonDetails } from './requests/fetchPokemonDetails';
import { PokemonModule } from './pokemon.module';
import { Pokemon } from './pokemon.schema';

const POKE_API_BASE = 'https://pokeapi.co/api/v2/pokemon';

// Function to fetch Pokémon with pagination, storing missing records in the database
export async function fetchPokemonList(page: number = 0) {
  const limit = 150;
  const offset = page * limit;

  try {
    // Query MongoDB with skip and limit
    // const existingPokemons = await Pokemon.
    //   .skip(offset)
    //   .limit(limit)
    //   .exec();
    const existingPokemons = [];

    // If no Pokémon are found, we need to fetch them from the external API
    if (existingPokemons.length === 0) {
      const pokemonIds = []; // Store the Pokémon IDs we need to fetch

      // Find the Pokémon IDs that are missing by fetching from the external API
      const { data } = await axios.get(`${POKE_API_BASE}?offset=${offset}&limit=${limit}`);
      data.results.forEach((pokemon: { url: string }) => {
        const id = pokemon.url.split('/').slice(-2, -1)[0]; // Extract Pokémon ID from URL
        pokemonIds.push(Number(id));
      });
    
      return data; // Return the newly fetched Pokémon
    }

    // Return the Pokémon if found in the database
    return existingPokemons;
  } catch (error) {
    console.error('Error fetching Pokémon list:', error.message);
    return [];
  }
}



@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  // Get a list of Pokémon with pagination (offset and limit)
  @Get('/')
  async getPokemons(
    @Query('offset') offset = 0, // Default offset to 0
    @Query('limit') limit = 150,  // Default limit to 150
  ) {
    // const offsetNumber = parseInt(offset, 10);
    // const limitNumber = parseInt(limit as string, 10);

    // Call service to fetch paginated pokemons
    //return await this.pokemonService.getPokemons(offsetNumber, limitNumber);

    try {
      const getPoke = await fetchPokemonList(0);

      // console.log(getPoke);
      return getPoke;
    } catch(err) {  
      console.error('Could not fetch poke', err);
    }
  }

  // Get details of a single Pokemon by ID
  @Get(':id')
  async getPokemonById(@Query('id') id: number) {
    //return await this.pokemonService.getPokemonById(id);
  }

  @Get('/favorite') 
  async getFavorite() {

  }

  @Post('/favorite/:pokemonId') 
  async addToFavorite() {
    
  }

  @Delete('/favorite/:pokemonId') 
  async removeFromFavorite() {

  }

  @Get('/search')
  async search() {

  }
}