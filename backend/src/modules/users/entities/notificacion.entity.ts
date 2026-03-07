import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from './usuario.entity';

@Entity('NOTIFICACION')
export class Notificacion {
  @PrimaryGeneratedColumn()
  id_notificacion: number;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'id_usuario_destino' })
  usuario_destino: Usuario;

  @Column({ type: 'varchar', length: 100 })
  tipo: string;

  @Column({ type: 'text' })
  mensaje: string;

  @CreateDateColumn()
  fecha_creacion: Date;

  @Column({ type: 'boolean', default: false })
  fue_leida: boolean;
}
