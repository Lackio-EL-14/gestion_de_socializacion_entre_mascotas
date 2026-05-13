import { Component } from '@angular/core';
import { AppLanguage, LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-sidebar-worker',
  standalone: false,
  templateUrl: './sidebar-worker.html',
  styleUrl: './sidebar-worker.scss',
})
export class SidebarWorker {
  readonly languageOptions: readonly AppLanguage[];
selectedLanguage: AppLanguage;
  constructor(private readonly languageService: LanguageService)
  {this.languageOptions = this.languageService.availableLanguages;
  this.selectedLanguage = this.languageService.getCurrentLanguage();}
  onLanguageChange(language: string): void {
  if (language !== 'es' && language !== 'en' && language !== 'fr') {
    return;
  }
  this.selectedLanguage = language as AppLanguage;
  this.languageService.setLanguage(language);
}
}
