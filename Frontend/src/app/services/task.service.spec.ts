import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private baseUrl = 'http://localhost:8080/api/tasks';

  constructor(private http: HttpClient) {}

  getTasks() {
    return this.http.get<any[]>(this.baseUrl);
  }

  getTaskById(id: number) {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  createTask(task: any) {
    return this.http.post<any>(this.baseUrl, task);
  }
}
