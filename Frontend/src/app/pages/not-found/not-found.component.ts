// src/app/pages/not-found/not-found.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule],
  template: `
    <div class="not-found-container">
      <mat-card>
        <mat-card-title>404 - Page Not Found</mat-card-title>
        <mat-card-content>The page you are looking for does not exist.</mat-card-content>
        <mat-card-actions>
          <button mat-button color="primary" [routerLink]="['/tasks']">Back to Tasks</button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .not-found-container { padding: 20px; }
    mat-card { max-width: 400px; margin: 0 auto; text-align: center; }
  `],
})
export class NotFoundComponent {}