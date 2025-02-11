import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerService } from '../logger/logger.service';
import { LoggerModule } from '../logger/logger.module';
import { Pokemon, PokemonSchema } from './pokemon.schema';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';
import { UserService } from '../users/users.service';
import { CurrentUserMiddleware } from '../users/middlewares/current-user.middleware';
import { UsersModule } from 'src/users/users.module';
import { PokemonDetails, PokemonDetailsSchema } from './pokemon-details.schema';
import { User } from 'src/users/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pokemon.name, schema: PokemonSchema }]),
    //MongooseModule.forFeature([{ name: PokemonDetails.name, schema: PokemonDetailsSchema }]),
    LoggerModule, 
    UsersModule
  ],
  controllers: [PokemonController],
  providers: [PokemonService, LoggerService, UserService],
})
export class PokemonModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*')
  }
}
