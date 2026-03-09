import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface RegistroUsuarioRequest {
  nombre: string;
  email: string;
  contrasena_hash: string;
  telefono: string;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  nombre = '';
  email = '';
  telefono = '';
  contrasena = '';
  confirmarContrasena = '';
  enviando = false;

  private readonly http = inject(HttpClient);

  registro(): void {
    if (
      !this.nombre ||
      !this.email ||
      !this.telefono ||
      !this.contrasena ||
      !this.confirmarContrasena
    ) {
      alert('Todos los campos son obligatorios');
      return;
    }

    if (this.contrasena !== this.confirmarContrasena) {
      alert('Las contrasenas no coinciden');
      return;
    }

    const body: RegistroUsuarioRequest = {
      nombre: this.nombre.trim(),
      email: this.email.trim(),
      contrasena_hash: this.contrasena,
      telefono: this.telefono.trim(),
    };

    this.enviando = true;

    this.http.post('http://localhost:3000/usuarios/registro', body).subscribe({
      next: () => {
        alert('Cuenta creada correctamente');
        this.limpiarFormulario();
        this.enviando = false;
      },
      error: (error) => {
        console.error('Error al registrar:', error);
        const mensaje = error?.error?.message;
        alert(Array.isArray(mensaje) ? mensaje.join('\n') : mensaje || 'Hubo un error al registrar');
        this.enviando = false;
      },
    });
  }

  private limpiarFormulario(): void {
    this.nombre = '';
    this.email = '';
    this.telefono = '';
    this.contrasena = '';
    this.confirmarContrasena = '';
  }
}
