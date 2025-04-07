// src/app/pages/task-form/task-form.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { TaskService, Task } from '../../services/task.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  template: `
    <mat-toolbar color="primary">
      <span>{{ isEditMode ? 'Edit Task' : 'Add Task' }}</span>
    </mat-toolbar>
    <div class="form-container">
      <mat-card>
        <form [formGroup]="taskForm" (ngSubmit)="onSubmit()">
          <mat-form-field appearance="fill">
            <mat-label>Title</mat-label>
            <input matInput formControlName="title">
            <mat-error *ngIf="taskForm.get('title')?.hasError('required')">Title is required</mat-error>
            <mat-error *ngIf="taskForm.get('title')?.hasError('maxlength')">Max 100 characters</mat-error>
          </mat-form-field>
          <mat-form-field appearance="fill">
            <mat-label>Description</mat-label>
            <textarea matInput formControlName="description"></textarea>
            <mat-error *ngIf="taskForm.get('description')?.hasError('maxlength')">Max 500 characters</mat-error>
          </mat-form-field>
          <mat-form-field appearance="fill">
            <mat-label>Status</mat-label>
            <mat-select formControlName="status">
              <mat-option *ngFor="let status of statusOptions" [value]="status">{{ status }}</mat-option>
            </mat-select>
          </mat-form-field>
          <div class="button-container">
            <button mat-raised-button color="primary" type="submit" [disabled]="taskForm.invalid">
              {{ isEditMode ? 'Update' : 'Create' }}
            </button>
            <button mat-button type="button" [routerLink]="['/tasks']">Cancel</button>
          </div>
          <div class="error" *ngIf="errorMessage">{{ errorMessage }}</div>
        </form>
      </mat-card>
    </div>
  `,
  styles: [`
    .form-container { padding: 20px; }
    mat-card { max-width: 600px; margin: 0 auto; }
    mat-form-field { width: 100%; margin-bottom: 20px; }
    .button-container { display: flex; gap: 10px; }
    .error { color: red; margin-top: 10px; }
  `],
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup;
  isEditMode = false;
  taskId?: number;
  errorMessage: string | null = null;
  statusOptions: Task['status'][] = ['TO_DO', 'IN_PROGRESS', 'DONE'];

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', Validators.maxLength(500)],
      status: ['TO_DO', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.taskId = +params['id'];
      if (this.taskId) {
        this.isEditMode = true;
        this.loadTask();
      }
    });
  }

  loadTask(): void {
    if (this.taskId) {
      this.taskService.getTaskById(this.taskId).subscribe({
        next: (task) => this.taskForm.patchValue(task),
        error: (err) => (this.errorMessage = err.message),
      });
    }
  }

  onSubmit(): void {
    if (this.taskForm.invalid) return;
    const task: Task = this.taskForm.value;
    const operation = this.isEditMode
      ? this.taskService.updateTask(this.taskId!, task)
      : this.taskService.createTask(task);
    operation.subscribe({
      next: () => this.router.navigate(['/tasks']),
      error: (err) => (this.errorMessage = err.message),
    });
  }
}