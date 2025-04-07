// src/app/pages/task-details/task-details.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { TaskService, Task } from '../../services/task.service';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule],
  template: `
    <div class="details-container" *ngIf="task; else loadingOrError">
      <mat-card>
        <mat-card-title>{{ task.title }}</mat-card-title>
        <mat-card-content>
          <p><strong>Description:</strong> {{ task.description || 'None' }}</p>
          <p><strong>Status:</strong> {{ task.status }}</p>
          <p><strong>Created At:</strong> {{ task.createdAt | date }}</p>
        </mat-card-content>
        <mat-card-actions>
          <button mat-button color="primary" (click)="editTask()">Edit</button>
          <button mat-button [routerLink]="['/tasks']">Back to List</button>
        </mat-card-actions>
      </mat-card>
    </div>
    <ng-template #loadingOrError>
      <div class="error" *ngIf="errorMessage">{{ errorMessage }}</div>
      <div class="loading" *ngIf="!errorMessage">Loading...</div>
    </ng-template>
  `,
  styles: [`
    .details-container { padding: 20px; }
    mat-card { max-width: 600px; margin: 0 auto; }
    mat-card-content p { margin: 10px 0; }
    .error, .loading { text-align: center; padding: 20px; }
    .error { color: red; }
  `],
})
export class TaskDetailsComponent implements OnInit {
  task: Task | null = null;
  errorMessage: string | null = null;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.taskService.getTaskById(id).subscribe({
      next: (task) => (this.task = task),
      error: (err) => (this.errorMessage = err.message),
    });
  }

  editTask(): void {
    if (this.task?.id) this.router.navigate(['/tasks/new'], { queryParams: { id: this.task.id } });
  }
}