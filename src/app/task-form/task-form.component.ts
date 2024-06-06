// task-form.component.ts
import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { TareaService } from '../services/tarea.service';
import { format } from 'date-fns';
@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule,ToolbarComponent

  ],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})

export class TaskFormComponent implements OnInit{
  taskForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    priority: ['ALTA',Validators.required],
    description: ['',Validators.required],
    date: [new Date().toLocaleString()],
    user: [''],
    status: ['ACTIVA']


    // Agrega más campos según sea necesario (por ejemplo, fecha, usuario)
  });


  constructor(private fb: FormBuilder, private tareaService: TareaService) {}
  ngOnInit(): void {
    // Set the user field from localStorage in ngOnInit
    const userCode = localStorage.getItem("codigo") || '';
    this.taskForm.patchValue({ user: userCode });
  }
  onSubmit(): void {
    console.log("entró");
    const item = localStorage.getItem("codigo");
    console.log(item);
    if (this.taskForm.valid) {
      console.log('Form Data: ', this.taskForm.value); // Log para depuración
      this.tareaService.createTarea(this.taskForm.value).subscribe(
        response => console.log('Task Saved successfuly', response),
        error => {
          console.error('Registration failed', error);
          alert('Registration failed: ' + error.message); // Mostrar mensaje de error al usuario
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }
  formatDateTime(date: string): string {
    return format(new Date(date), 'yyyy-MM-dd HH:mm:ss');
  }
}
