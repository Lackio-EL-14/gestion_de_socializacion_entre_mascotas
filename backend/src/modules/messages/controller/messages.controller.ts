import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { MessagesService } from '../service/messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get('inbox/:idMascota')
  async getInbox(@Param('idMascota', ParseIntPipe) idMascota: number) {
    return this.messagesService.getInbox(idMascota);
  }

  @Get('history/:idMatch')
  async getHistory(@Param('idMatch', ParseIntPipe) idMatch: number) {
    return this.messagesService.getHistory(idMatch);
  }
}
