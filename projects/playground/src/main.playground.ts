import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { PlaygroundModule } from 'angular-playground';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

PlaygroundModule.configure({
  selector: 'app-root',
  overlay: false,
  modules: [
    ReactiveFormsModule,
    HttpClientModule,

    BrowserAnimationsModule,
  ]
});

platformBrowserDynamic()
  .bootstrapModule(PlaygroundModule)
  .catch(err => console.error(err));
