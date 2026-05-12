import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessagesService } from '../service/messages.service';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:4200', 'https://dogchat-frontend.onrender.com'],
    credentials: true,
  },
})
export class MessagesGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly messagesService: MessagesService) {}

  notifyMatchCreated(match: {
    id_match: number;
    mascota_1: { id_mascota: number };
    mascota_2: { id_mascota: number };
    fecha_match?: Date;
    activo?: boolean;
  }) {
    this.server.emit('matchCreated', { match });
  }

  handleConnection(client: Socket) {
    console.log(`Cliente conectado al Chat: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Cliente desconectado: ${client.id}`);
  }

  @SubscribeMessage('joinChat')
  handleJoinChat(
    @MessageBody() data: { idMatch: number },
    @ConnectedSocket() client: Socket,
  ) {
    const roomName = `match_${data.idMatch}`;
    client.join(roomName);
    console.log(`Cliente ${client.id} se unió a la sala: ${roomName}`);
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody() payload: { idMatch: number; idUsuario: number; contenido: string },
    @ConnectedSocket() client: Socket,
  ) {
    const mensajeGuardado = await this.messagesService.saveMessage(
      payload.idMatch,
      payload.idUsuario,
      payload.contenido,
    );

    const roomName = `match_${payload.idMatch}`;
    this.server.to(roomName).emit('receiveMessage', mensajeGuardado);
  }
}
