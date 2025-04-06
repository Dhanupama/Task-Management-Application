import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';

@Component({
  standalone: true,
  selector: 'app-task-list',
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];

  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit() {
    this.taskService.getTasks().subscribe((data) => (this.tasks = data));
  }

  goToTask(id: number) {
    this.router.navigate(['/tasks', id]);
  }

  addTask() {
    this.router.navigate(['/tasks/new']);
  }
}
