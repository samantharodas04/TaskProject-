import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../auth.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: [''],
    password: ['']
  });

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  onSubmit(): void {

    this.authService.login(this.loginForm.value).subscribe(
      response => {
        console.log('Login successful', response);
        localStorage.setItem('token', response.token);
        localStorage.setItem('codigo', response.codigo);
        // Redirige al usuario a la página del formulario
      this.router.navigate(['/form']); // Ajusta la ruta según tu configuración
      },
      error => console.error('Login failed', error)
    );
  }
}
