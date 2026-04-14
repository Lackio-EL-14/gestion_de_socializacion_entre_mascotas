import { Component } from '@angular/core';
import { QuickCardComponent } from '../../../shared/components/quick-card/quick-card.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard-owner',
  standalone: true,
  imports: [QuickCardComponent, RouterModule],
  templateUrl: './dashboard-owner.component.html',
  styleUrls: ['./dashboard-owner.component.scss']
})
export class DashboardOwnerComponent {
  nombreUsuario = sessionStorage.getItem('usuarioNombre') || 'Usuario';
}
