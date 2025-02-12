import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';
import { LoggerModule } from '../logger/logger.module';
import { LoggerService } from '../logger/logger.service';
import { CurrentUserMiddleware } from '../users/middlewares/current-user.middleware';
import { UserService } from '../users/users.service';
import {
  FavoritePokemon,
  FavoritePokemonSchema,
} from './favorite-pokemon.schema';
import { PokemonController } from './pokemon.controller';
import { Pokemon, PokemonSchema } from './pokemon.schema';
import { PokemonService } from './pokemon.service';
import { FavoritePokemonService } from './favorite-pokemon.service';
import { PokemonDetails, PokemonDetailsSchema } from './pokemon-details.schema';
import { PokemonDetailsService } from './pokemon-details.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pokemon.name, schema: PokemonSchema }]),
    MongooseModule.forFeature([
      { name: PokemonDetails.name, schema: PokemonDetailsSchema },
    ]),
    MongooseModule.forFeature([
      { name: FavoritePokemon.name, schema: FavoritePokemonSchema },
    ]),
    LoggerModule,
    UsersModule,
  ],
  controllers: [PokemonController],
  providers: [
    PokemonService,
    LoggerService,
    UserService,
    FavoritePokemonService,
    PokemonDetailsService,
  ],
})
export class PokemonModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
