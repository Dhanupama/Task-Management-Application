// app.routes.ts
import { Routes } from '@angular/router';
import { TaskListComponent } from './pages/task-list/task-list.component';
import { TaskFormComponent } from './pages/task-form/task-form.component';
import { TaskDetailsComponent } from './pages/task-details/task-details.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthGuard } from './services/auth.guard';

export const APP_ROUTES: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  { path: 'tasks', component: TaskListComponent, canActivate: [AuthGuard] },
  { path: 'tasks/new', component: TaskFormComponent, canActivate: [AuthGuard] },
  { path: 'tasks/:id', component: TaskDetailsComponent, canActivate: [AuthGuard] },
  { path: '**', component: NotFoundComponent },
];