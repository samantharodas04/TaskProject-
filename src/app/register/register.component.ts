import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../auth.service';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, MatRadioModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    name: ['', Validators.required],
    password: ['', Validators.required],
    birthdate: ['', Validators.required],
    gender: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  onSubmit(): void {
    if (this.registerForm.valid) {
      console.log('Form Data: ', this.registerForm.value); // Log para depuración
      this.authService.register(this.registerForm.value).subscribe(
        response => console.log('Registration successful', response),
        error => {
          console.error('Registration failed', error);
          alert('Registration failed: ' + error.message); // Mostrar mensaje de error al usuario
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }

}
