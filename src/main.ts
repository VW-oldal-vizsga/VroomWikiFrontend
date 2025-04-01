import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import localeHu from '@angular/common/locales/hu';
import localeEn from '@angular/common/locales/en';
import { registerLocaleData } from '@angular/common';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/');
}

registerLocaleData(localeHu, 'hu');
registerLocaleData(localeEn, 'en');

bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));
