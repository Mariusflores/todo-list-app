package com.mada.todo.todolistapp.controller;

import com.mada.todo.todolistapp.dto.ObjectiveRequest;
import com.mada.todo.todolistapp.dto.ObjectiveResponse;
import com.mada.todo.todolistapp.model.Objective;
import com.mada.todo.todolistapp.service.TodoListAppService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping("/api/todolist")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class TodoListAppController {

    private final TodoListAppService service;

    @GetMapping
    public List<ObjectiveResponse> showAllObjectives(){

        return service.getAllObjectives();

    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void createObjective(@RequestBody ObjectiveRequest objectiveRequest ){
        service.createObjective(objectiveRequest);
    }
}
