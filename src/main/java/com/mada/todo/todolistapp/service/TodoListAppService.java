package com.mada.todo.todolistapp.service;

import com.mada.todo.todolistapp.dto.ObjectiveRequest;
import com.mada.todo.todolistapp.dto.ObjectiveResponse;
import com.mada.todo.todolistapp.model.Objective;
import com.mada.todo.todolistapp.repository.TodoListRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class TodoListAppService {

    private final TodoListRepository repository;

    public void createObjective(ObjectiveRequest objectiveRequest) {

        Objective objective = Objective.builder()
                .description(objectiveRequest.getDescription())
                .priority(objectiveRequest.getPriority())
                .deadline(objectiveRequest.getDeadline())
                .build();

        repository.save(objective);
        log.info("objective has been saved");
    }

    public List<ObjectiveResponse> getAllObjectives() {
        List<Objective> objectives = repository.findAll();

        return objectives.stream().map(this::mapToObjectiveResponse).toList();
    }

    private ObjectiveResponse mapToObjectiveResponse(Objective objective) {

        return ObjectiveResponse.builder()
                .Id(objective.getId())
                .description(objective.getDescription())
                .priority(objective.getPriority())
                .deadline(objective.getDeadline())
                .build();
    }
}
