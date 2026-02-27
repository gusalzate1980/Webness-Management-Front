import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { providePrimeNG } from 'primeng/config';
import { definePreset } from '@primeng/themes';
import Material from '@primeng/themes/material';

import { routes } from './app.routes';

const MyTheme = definePreset(Material, {
  semantic: {
    primary: {
      50:  '#235c94',
      100: '#224364',
      200: '#0f3a64',
      300: '#092d52',
      400: '#092d52',
      500: '#041e38',
      600: '#041e38',
      700: '#011427',
      800: '#011427',
      900: '#011427'
    }
  }
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    providePrimeNG({
      theme: {
        preset: MyTheme
      },
      ripple: true
    })
  ]
};