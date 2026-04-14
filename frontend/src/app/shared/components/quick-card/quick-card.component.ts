import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-quick-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './quick-card.component.html',
  styleUrls: ['./quick-card.component.scss']
})
export class QuickCardComponent {
  @Input() route!: string;
  @Input() iconClass!: string;
  @Input() titulo!: string;
  @Input() descripcion!: string;
}
