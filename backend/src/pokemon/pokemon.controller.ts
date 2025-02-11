import { Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { PokemonService } from './pokemon.service';



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