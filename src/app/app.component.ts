import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private translate: TranslateService) {
    translate.addLangs(['fr']);
    translate.setDefaultLang('fr');

    iconRegistry.addSvgIcon(
      'check',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icon/check.svg'));
    iconRegistry.addSvgIcon(
      'back',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icon/back.svg'));
    iconRegistry.addSvgIcon(
      'medic',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icon/medic.svg'));
  }
}
