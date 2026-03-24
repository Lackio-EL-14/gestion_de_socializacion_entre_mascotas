import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Mascota {
  id_mascota: number;
  nombre: string;
  raza: string;
  tamano: string;
  edad: number;
  genero: string;
  estado_salud: string;
  vacuna_imagen_url: string | null;
  fecha_registro: string;
  id_usuario: number;
}

@Component({
  selector: 'app-list-pets',
  standalone: false,
  templateUrl: './list-pets.html',
  styleUrl: './list-pets.scss'
})
export class ListPetsComponent implements OnInit {
  mascotas: Mascota[] = [];
  cargando = false;
  error = '';

  readonly imagenPlaceholder =
    'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=800&q=80';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.obtenerMascotas();
  }

  obtenerMascotas(): void {
    const idUsuario = localStorage.getItem('id_usuario');

    if (!idUsuario) {
      this.error = 'No se encontró un usuario logeado';
      return;
    }

    this.cargando = true;
    this.error = '';

    this.http.get<Mascota[]>(`http://localhost:3000/pets/user/${idUsuario}`).subscribe({
      next: (respuesta) => {
        this.mascotas = respuesta;
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al obtener mascotas:', error);
        this.error = 'No se pudieron cargar tus mascotas';
        this.cargando = false;
      }
    });
  }

  editarMascota(idMascota: number): void {
    console.log('Editar mascota con id:', idMascota);
    // en el sig feat:
    // this.router.navigate(['/editar-mascota', idMascota]);
  }

  getNombreSeguro(nombre: string): string {
    return nombre?.trim() ? nombre : 'Sin nombre';
  }

  getRazaSegura(raza: string): string {
    return raza?.trim() ? raza : 'Raza no especificada';
  }
}