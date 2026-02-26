import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, InputTextModule, PasswordModule, ButtonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  constructor(private router: Router) {}

  onLogin() {
    // Aquí manejas tu lógica de validación
    this.router.navigate(['/main']);
  }
}