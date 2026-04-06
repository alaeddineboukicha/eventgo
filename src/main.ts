import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { NoReuseRouteStrategy } from './app/no-reuse-route.strategy';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: NoReuseRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes),
    provideHttpClient()
  ],
});
