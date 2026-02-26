import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { MainMenu } from './pages/main/main';



export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'main', component: MainMenu },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];