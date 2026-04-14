import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrandLogoComponent } from '../../shared/components/brand-logo/brand-logo.component';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterModule, BrandLogoComponent],
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent {}
