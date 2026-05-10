import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Match } from './entities/match.entity';
import { Interaccion } from '../users/entities/interaccion.entity';
import { MatchesController } from './controller/matches.controller';
import { MatchesService } from './service/matches.service';
import { MessagesModule } from '../messages/messages.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Match, Interaccion]),
    MessagesModule
  ],
  controllers: [MatchesController],
  providers: [MatchesService],
  exports: [MatchesService]
})
export class MatchesModule {}
