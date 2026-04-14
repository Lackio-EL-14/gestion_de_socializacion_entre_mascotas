import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss'] // O vacío si pusiste los estilos en el global
})
export class AlertModalComponent {
  @Input() visible = false;
  @Input() titulo = '';
  @Input() mensaje = '';
  @Input() tipo: 'success' | 'error' = 'success';
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}
