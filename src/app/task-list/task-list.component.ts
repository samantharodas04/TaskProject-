import { Component, OnInit,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { Tarea } from '../models/tarea.model';
import { TareaService } from '../services/tarea.service';
import { TypePipe } from '../pipes/type.pipe';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule,ToolbarComponent
  ],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {
  tasks: any[] = [];

  constructor(private tareaService: TareaService) {}


  ngOnInit(): void {
    const userCode = localStorage.getItem("codigo") || '';
    this.tareaService.getTarea(userCode).subscribe(
      (data) => {
        this.tasks = data;
      },
      (error) => {
        console.error('Failed to fetch tasks', error);
      }
    );
  }

  // Method to handle button click
  onButtonClick(param: string): void {
    console.log('Button clicked! ${param}');
    // Add additional logic here
  }



}
