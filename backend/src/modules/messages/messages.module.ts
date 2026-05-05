import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mensaje } from './entities/messages.entity';
import { Match } from '../matches/entities/match.entity';
import { MessagesController } from './controller/messages.controller';
import { MessagesService } from './service/messages.service';
import { MessagesGateway } from './gateway/messages.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Mensaje, Match])],
  controllers: [MessagesController],
  providers: [MessagesService, MessagesGateway],
  exports: [MessagesService],
})
export class MessagesModule {}
