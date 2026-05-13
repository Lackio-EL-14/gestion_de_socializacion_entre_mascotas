import { Component } from '@angular/core';
import { AppLanguage, LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-sidebar-owner',
  standalone: false,
  templateUrl: './sidebar-owner.html',
  styleUrl: './sidebar-owner.scss'
})
export class SidebarOwnerComponent {
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
