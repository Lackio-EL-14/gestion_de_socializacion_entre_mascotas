import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrandLogoComponent } from '../brand-logo/brand-logo.component';

@Component({
  selector: 'app-home-header',
  standalone: true,
  imports: [RouterModule, BrandLogoComponent],
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.scss']
})
export class HomeHeaderComponent {}
