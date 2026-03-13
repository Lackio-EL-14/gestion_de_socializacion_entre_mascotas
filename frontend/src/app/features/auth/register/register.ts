import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface RegistroUsuarioRequest {
  nombre: string;
  email: string;
  contrasena_hash: string;
  telefono: string;
}

@Component({
  selector: 'app-register',
  standalone: false,
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
  modalVisible = false;
  modalTitulo = '';
  modalMensaje = '';
  modalTipo: 'success' | 'error' = 'success';

  constructor(private http: HttpClient, private router: Router) {}

  registro(): void {
    if (
      !this.nombre ||
      !this.email ||
      !this.telefono ||
      !this.contrasena ||
      !this.confirmarContrasena
    ) {
      this.mostrarModal('Campos incompletos', 'Todos los campos son obligatorios', 'error');
      return;
    }

    if (this.contrasena !== this.confirmarContrasena) {
      this.mostrarModal('Error de validación', 'Las contraseñas no coinciden', 'error');
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
        this.limpiarFormulario();
        this.enviando = false;
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Error al registrar:', error);
        const mensaje = error?.error?.message;
        this.mostrarModal(
          'Error de registro',
          Array.isArray(mensaje) ? mensaje.join('\n') : mensaje || 'Hubo un error al registrar',
          'error'
        );
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
  mostrarModal(titulo: string, mensaje: string, tipo: 'success' | 'error'): void {
  this.modalTitulo = titulo;
  this.modalMensaje = mensaje;
  this.modalTipo = tipo;
  this.modalVisible = true;
}

cerrarModal(): void {
  this.modalVisible = false;

  if (this.modalTipo === 'success') {
    this.router.navigate(['/login']);
  }
}
}
