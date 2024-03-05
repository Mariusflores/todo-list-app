package com.mada.todo.todolistapp.dto;

import com.mada.todo.todolistapp.model.Priority;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ObjectiveResponse {
    private String Id;
    private String description;
    private Priority priority;
    private LocalDate deadline;
}
