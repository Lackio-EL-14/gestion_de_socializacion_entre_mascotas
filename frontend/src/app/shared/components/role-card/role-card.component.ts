import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-role-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './role-card.component.html',
  styleUrls: ['./role-card.component.scss']
})
export class RoleCardComponent {
  @Input() roleType: 'owner' | 'worker' = 'owner';
  @Input() title: string = '';
  @Input() description: string = '';
}
