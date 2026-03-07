import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from './usuario.entity';

@Entity('REPORTE')
export class Reporte {
  @PrimaryGeneratedColumn()
  id_reporte: number;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'id_usuario_reportante' })
  usuario_reportante: Usuario;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'id_usuario_reportado' })
  usuario_reportado: Usuario;

  @Column({ type: 'varchar', length: 255 })
  motivo: string;

  @Column({ type: 'text', nullable: true })
  comentario: string;

  // Nuestro fix aplicado aquí
  @Column({ type: 'enum', enum: ['pendiente', 'resuelto', 'ignorado'], default: 'pendiente' })
  estado: string;

  @CreateDateColumn()
  fecha_reporte: Date;

  @ManyToOne(() => Usuario, { nullable: true })
  @JoinColumn({ name: 'id_admin_resolutor' })
  admin_resolutor: Usuario;

  @Column({ type: 'datetime', nullable: true })
  fecha_resolucion: Date;
}
