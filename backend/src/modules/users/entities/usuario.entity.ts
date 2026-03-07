import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Rol } from './rol.entity';

@Entity('USUARIO') 
export class Usuario {
  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'varchar', length: 150, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  contrasena_hash: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  telefono: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  foto_perfil_url: string;

  @Column({ type: 'int', default: 0 })
  cantidad_strikes: number; 

  @CreateDateColumn()
  fecha_registro: Date;

  @Column({ type: 'boolean', default: true })
  esta_activo: boolean;

   
  @ManyToOne(() => Rol)
  @JoinColumn({name: 'id_rol'})
  rol: Rol;
}
