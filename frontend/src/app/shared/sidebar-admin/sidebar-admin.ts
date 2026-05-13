import { Component } from '@angular/core';
import { AppLanguage, LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-sidebar-admin',
  standalone: false,
  templateUrl: './sidebar-admin.html',
  styleUrl: './sidebar-admin.scss'
})
export class SidebarAdminComponent {
  readonly languageOptions: readonly AppLanguage[];
selectedLanguage: AppLanguage;
  constructor(private readonly languageService: LanguageService)
  {this.languageOptions = this.languageService.availableLanguages;
  this.selectedLanguage = this.languageService.getCurrentLanguage();}
  mobileOpen = false;

  toggleMobileSidebar(): void {
    this.mobileOpen = !this.mobileOpen;
  }

  closeMobileSidebar(): void {
    this.mobileOpen = false;
  }
  onLanguageChange(language: string): void {
  if (language !== 'es' && language !== 'en' && language !== 'fr') {
    return;
  }
  this.selectedLanguage = language as AppLanguage;
  this.languageService.setLanguage(language);
}
}
