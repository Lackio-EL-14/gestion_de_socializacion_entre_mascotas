import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mensaje } from '../entities/messages.entity';
import { Match } from '../../matches/entities/match.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Mensaje)
    private readonly mensajeRepository: Repository<Mensaje>,
    @InjectRepository(Match)
    private readonly matchRepository: Repository<Match>,
  ) {}

  async getInbox(idMascota: number) {
    const matches = await this.matchRepository.find({
      where: [
        { mascota_1: { id_mascota: idMascota }, activo: true },
        { mascota_2: { id_mascota: idMascota }, activo: true },
      ],
      relations: ['mascota_1', 'mascota_2'],
    });

    const inbox = await Promise.all(
      matches.map(async (match) => {
        const lastMessage = await this.mensajeRepository.findOne({
          where: { match: { id_match: match.id_match } },
          order: { fecha_envio: 'DESC' },
          relations: ['usuario_remitente'], 
        });

        return {
          match,
          lastMessage: lastMessage || null,
        };
      }),
    );

    return inbox.sort((a, b) => {
      const dateA = a.lastMessage ? new Date(a.lastMessage.fecha_envio).getTime() : 0;
      const dateB = b.lastMessage ? new Date(b.lastMessage.fecha_envio).getTime() : 0;
      return dateB - dateA;
    });
  }

  async getHistory(idMatch: number) {
    const matchExists = await this.matchRepository.findOne({ where: { id_match: idMatch } });
    if (!matchExists) {
      throw new NotFoundException('El Match no existe');
    }

    return this.mensajeRepository.find({
      where: { match: { id_match: idMatch } },
      order: { fecha_envio: 'ASC' }, 
      relations: ['usuario_remitente'],
    });
  }

  // Utilidad para HU-07 (WebSockets)
  async saveMessage(idMatch: number, idUsuarioRemitente: number, contenido: string) {
    const nuevoMensaje = this.mensajeRepository.create({
      match: { id_match: idMatch },
      usuario_remitente: { id_usuario: idUsuarioRemitente },
      contenido,
    });
    return this.mensajeRepository.save(nuevoMensaje);
  }
}
