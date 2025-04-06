import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service.spec';

@Component({
  standalone: true,
  selector: 'app-task-details',
  imports: [CommonModule],
  templateUrl: './task-details.component.html',
})
export class TaskDetailsComponent implements OnInit {
  task: any;

  constructor(private route: ActivatedRoute, private taskService: TaskService) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.taskService.getTaskById(id).subscribe((data) => (this.task = data));
  }
}
