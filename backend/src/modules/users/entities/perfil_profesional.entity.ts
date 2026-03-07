import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { Usuario } from './usuario.entity';

@Entity('PERFIL_PROFESIONAL')
export class PerfilProfesional {
  @PrimaryGeneratedColumn()
  id_perfil_prof: number;

  @OneToOne(() => Usuario)
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;

  @Column({ type: 'varchar', length: 150 })
  nombre_servicio: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  datos_contacto: string;

  @CreateDateColumn()
  fecha_creacion: Date;
}
