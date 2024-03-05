package com.mada.todo.todolistapp.dto;

import com.mada.todo.todolistapp.model.Priority;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ObjectiveRequest {

    private String description;
    private Priority priority;
    private LocalDate deadline;

}
