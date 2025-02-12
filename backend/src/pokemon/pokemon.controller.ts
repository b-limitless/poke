import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/guard/auth.guard';
import { LoggerService } from 'src/logger/logger.service';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { limit } from '../config';
import { User } from '../users/user.schema';
import { FavoritePokemonService } from './favorite-pokemon.service';
import { PokemonDetailsService } from './pokemon-details.service';
import { PokemonService } from './pokemon.service';
import { fetchDetailsAndEvolution } from './utils/fetchDetailsAndEvolution';
import { fetchPokemonList } from './utils/fetchPokemonList';
import { searchPokemonByName } from './utils/searchPokemonByName';

@Controller('pokemon')
export class PokemonController {
  constructor(
    private readonly pokemonService: PokemonService,
    private readonly favoritePokemonService: FavoritePokemonService,
    private readonly pokemonDetailService: PokemonDetailsService,
    private readonly loggerService: LoggerService,
  ) {}

  @Get('/')
  async getPokemons(
    @Query('page') page = 0, // Default offset to 0
  ) {
    const skip = page * limit;
    try {
      const getPokemons = await this.pokemonService.find(limit, skip);

      this.loggerService.info(`Poke ${getPokemons}`);

      if (getPokemons.length > 0) {
        this.loggerService.info(
          'Pokemon found with query fetchin from local database',
        );
        return {
          results: getPokemons,
        };
      }
      // If empty is returned
      if (getPokemons.length === 0) {
        // Fetch from pokemon api and insert to db
        this.loggerService.info(
          'Pokemons did not find the query fetching from pokemon api',
        );
        const { results, count, next, previous } = (await fetchPokemonList(
          page,
        )) as any;

        try {
          this.loggerService.info('Saving pokemon to local database.');
          const savePokemons =
            await this.pokemonService.insertManyPokemon(results);

          return {
            results: savePokemons,
            count,
            next,
            previous,
          };
        } catch (err) {
          this.loggerService.error(
            `Could not save pokemons to database ${err.toString()}`,
          );
        }
      }
    } catch (err) {
      this.loggerService.error(`Something went wrong ${err.toString()}`);
    }

    try {
    } catch (err) {
      this.loggerService.error(`Something went wrong ${err.toString()}`);
    }
  }

  @UseGuards(AuthGuard)
  @Get('/favorite')
  async getFavorite(@CurrentUser() user: User, @Session() session: any) {
    const userId = user.id;
    try {
      const getMyFavriotePokemon =
        this.favoritePokemonService.findByUserId(userId);
      return getMyFavriotePokemon;
    } catch (err) {
      this.loggerService.error(
        `Could not query favorite pokemon service ${err.toString()}`,
      );
    }
    return user;
  }

  @Post('/favorite/:id')
  async addToFavorite(@Param('id') pokemonId, @CurrentUser() user: User) {
    const userId = user.id;

    try {
      const addFavriote = await this.favoritePokemonService.toggleFavorite(
        userId,
        pokemonId,
      );
      return addFavriote;
    } catch (err) {
      this.loggerService.error(
        `Could not query favorite pokemon service ${err.toString()}`,
      );
    }
  }

  @Get('/search/:name')
  async getPokemon(@Param('name') name) {
    try {
      return searchPokemonByName(name);
    } catch (err) {
      this.loggerService.error(`Search query error ${err.toString()}`);
      throw new Error(err);
    }
  }

  @Get('/:id')
  async getPokemonDetails(@Param('id') id) {
    try {
      this.loggerService.info('Searching for pokeom details in local database.');
      const findDetails = await this.pokemonDetailService.findById(Number(id));

      
      if(findDetails) {
        this.loggerService.info('Found pokemon in local database');
        return findDetails;
      }
      if(!findDetails) {
       this.loggerService.info('Did not find pokemon. Fetching from the pokemon api server.');
        // Fetch from pokemon server and update the server
        const fetchDetails =  await fetchDetailsAndEvolution(id);
        this.loggerService.info('Fetch the details');
        // Save it to db
        const saveToDB = this.pokemonDetailService.create(fetchDetails as any); 
        this.loggerService.info(`Save the details to database ${JSON.stringify(fetchDetails)}`);

        // return saveToDB;
        return saveToDB;
      }

     
    } catch (err) {
      this.loggerService.error(`Search query error ${err.toString()}`);
      throw new Error(err);
    }
  }


  @Get('/getPoke')
  async getPoke() {
    try {
      const getPoke = await this.pokemonService.find(0, 10);
      return getPoke;
    } catch (err) {}
  }
}
