import 'zone.js'; // ✅ Obrigatório
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { appConfig } from './app/app.config';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes'; // seu arquivo de rotas

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    ...appConfig.providers,
    provideRouter(routes), // 👈 IMPORTANTE
  ],
}).catch((err) => console.error(err));
