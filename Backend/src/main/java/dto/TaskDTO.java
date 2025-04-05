package dto;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder


public class TaskDTO { private Long id;
    private String title;
    private String description;
    private String status;
}
