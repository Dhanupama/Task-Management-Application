package com.example.taskmanager.dto;

import javax.validation.constraints.NotBlank;
import java.time.LocalDate;

public class TaskDTO {
    private Long id;

    @NotBlank(message = "Title is required")
    private String title;
    private String description;
    private String status;
    private LocalDate createdAt;

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public LocalDate getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDate createdAt) { this.createdAt = createdAt; }
}