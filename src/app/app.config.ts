import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HttpClient, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from '../services/auth.interceptor';
import { DEFAULT_LANGUAGE, FakeMissingTranslationHandler, ISOLATE_TRANSLATE_SERVICE, MissingTranslationHandler, TranslateCompiler, TranslateDefaultParser, TranslateFakeCompiler, TranslateLoader, TranslateParser, TranslateService, TranslateStore, USE_DEFAULT_LANG, USE_EXTEND } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../main';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideToastr({
      positionClass: 'toast-top-center',
      timeOut: 10000,
      progressBar: true,
      preventDuplicates: true,
      
    }),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient]
    },
    TranslateService,
    TranslateStore,
    {
      provide: TranslateCompiler,
      useClass: TranslateFakeCompiler 
    },
    {
      provide: TranslateParser,
      useClass: TranslateDefaultParser 
    },
    {
      provide: MissingTranslationHandler,
      useClass: FakeMissingTranslationHandler 
    },
    {
      provide: USE_DEFAULT_LANG, 
      useValue: true 
    },
    {
      provide: ISOLATE_TRANSLATE_SERVICE, 
      useValue: false 
    },
    {
      provide: USE_EXTEND, 
      useValue: false 
    },
    {
      provide: DEFAULT_LANGUAGE, 
      useValue: 'hu' 
    }
  ]
};