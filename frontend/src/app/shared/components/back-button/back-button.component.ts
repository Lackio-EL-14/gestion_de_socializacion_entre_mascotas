import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-back-button',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss']
})
export class BackButtonComponent {
  @Input() route!: string;
  @Input() label!: string;
}
