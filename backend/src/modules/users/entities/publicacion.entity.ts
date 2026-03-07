import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from './usuario.entity';

@Entity('PUBLICACION')
export class Publicacion {
  @PrimaryGeneratedColumn()
  id_publicacion: number;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;

  @Column({ type: 'text', nullable: true })
  contenido_texto: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  imagen_url: string;

  @CreateDateColumn()
  fecha_publicacion: Date;

  // Nuestro fix aplicado aquí
  @Column({ type: 'enum', enum: ['pendiente', 'aprobada', 'rechazada'], default: 'pendiente' })
  estado: string;
}
