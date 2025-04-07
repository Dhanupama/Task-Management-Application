// src/app/pages/task-list/task-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TaskService, Task } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatToolbarModule,
    MatTableModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
  ],
  template: `
    <mat-toolbar color="primary">
      <span>Task Manager</span>
      <span class="spacer"></span>
      <button mat-button [routerLink]="['/tasks/new']">Add Task</button>
    </mat-toolbar>
    <div class="filter-container">
      <mat-form-field appearance="fill">
        <mat-label>Filter by Status</mat-label>
        <mat-select (selectionChange)="filterTasks($event.value)">
          <mat-option value="ALL">All</mat-option>
          <mat-option value="TO_DO">To Do</mat-option>
          <mat-option value="IN_PROGRESS">In Progress</mat-option>
          <mat-option value="DONE">Done</mat-option>
        </mat-select>
      </mat-form-field>
    </div>
    <div class="table-container" *ngIf="!errorMessage; else errorBlock">
      <table mat-table [dataSource]="filteredTasks">
        <ng-container matColumnDef="title">
          <th mat-header-cell *matHeaderCellDef>Title</th>
          <td mat-cell *matCellDef="let task">{{ task.title }}</td>
        </ng-container>
        <ng-container matColumnDef="status">
          <th mat-header-cell *matHeaderCellDef>Status</th>
          <td mat-cell *matCellDef="let task">{{ task.status }}</td>
        </ng-container>
        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef>Actions</th>
          <td mat-cell *matCellDef="let task">
            <button mat-button color="primary" [routerLink]="['/tasks', task.id]">View</button>
            <button mat-button color="warn" (click)="deleteTask(task.id!)">Delete</button>
          </td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
    </div>
    <ng-template #errorBlock>
      <div class="error">{{ errorMessage }}</div>
    </ng-template>
  `,
  styles: [`
    .spacer { flex: 1 1 auto; }
    .filter-container { padding: 20px; }
    .table-container { padding: 20px; }
    table { width: 100%; }
    .error { color: red; padding: 20px; text-align: center; }
  `],
})
export class TaskListComponent implements OnInit {
  displayedColumns: string[] = ['title', 'status', 'actions'];
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  errorMessage: string | null = null;

  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.filteredTasks = [...tasks];
        this.errorMessage = null;
      },
      error: (err) => (this.errorMessage = err.message),
    });
  }

  filterTasks(status: string): void {
    this.filteredTasks = status === 'ALL'
      ? [...this.tasks]
      : this.tasks.filter(task => task.status === status);
  }

  deleteTask(id: number): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id).subscribe({
        next: () => this.loadTasks(),
        error: (err) => (this.errorMessage = err.message),
      });
    }
  }
}