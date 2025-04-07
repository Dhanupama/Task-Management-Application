package service;




import dto.TaskDTO;
import entity.Task;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import repository.TaskRepo;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class TaskService {

    private final TaskRepo taskRepo;
    private final ModelMapper modelMapper;

    @Autowired
    public TaskService(TaskRepo taskRepo, ModelMapper modelMapper) {
        this.taskRepo = taskRepo;
        this.modelMapper = modelMapper;
    }

    public List<Task> getAllTasks() {
        return taskRepo.findAll()
                .stream()
                .map(task -> modelMapper.map(task, Task.class))
                .collect(Collectors.toList());
    }

    public Task getTaskById(Long id) {
        Optional<Task> task = taskRepo.findById(id);
        return task.map(value -> modelMapper.map(value, Task.class)).orElse(null);
    }

    public Task createTask(Task taskDto) {
        Task task = modelMapper.map(taskDto, Task.class);
        Task savedTask = taskRepo.save(task);
        return modelMapper.map(savedTask, Task.class);
    }

    public Task updateTask(Long id, Task taskDto) {
        Optional<Task> existing = taskRepo.findById(id);
        if (existing.isPresent()) {
            Task task = existing.get();
            task.setTitle(taskDto.getTitle());
            task.setDescription(taskDto.getDescription());
            task.setCompleted(taskDto.isCompleted());
            return modelMapper.map(taskRepo.save(task), Task.class);
        }
        return null;
    }

    public void deleteTask(Long id) {
        taskRepo.deleteById(id);
    }
}

