
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';

@Component({
  standalone: true,
  selector: 'app-task-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.component.html',
})
export class TaskFormComponent {
  task = { title: '', description: '', status: 'TO_DO' as 'TO_DO' };

  constructor(private taskService: TaskService, private router: Router) {}

  saveTask() {
    this.taskService.createTask(this.task).subscribe(() => {
      this.router.navigate(['/tasks']);
    });
  }
}
