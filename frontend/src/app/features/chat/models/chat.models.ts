/**
 * Modelos para el módulo de chat
 */

export interface UsuarioRemitente {
  id_usuario: number;
  nombres?: string;
  email?: string;
}

export interface Mascota {
  id_mascota: number;
  nombre: string;
}

export interface Match {
  id_match: number;
  mascota_1: Mascota;
  mascota_2: Mascota;
}

export interface ChatMessage {
  id_mensaje: number;
  contenido: string;
  fecha_envio: string;
  usuario_remitente: UsuarioRemitente;
}

export interface LastMessage {
  id_mensaje: number;
  contenido: string;
  fecha_envio: string;
  usuario_remitente: UsuarioRemitente;
}

export interface InboxChat {
  match: Match;
  lastMessage: LastMessage | null;
}

export interface SendMessagePayload {
  idMatch: number;
  idUsuario: number;
  contenido: string;
}

export interface JoinChatPayload {
  idMatch: number;
}

export interface MatchCreatedPayload {
  match: Match;
}
