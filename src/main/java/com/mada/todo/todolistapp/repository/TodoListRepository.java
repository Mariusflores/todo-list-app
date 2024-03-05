package com.mada.todo.todolistapp.repository;

import com.mada.todo.todolistapp.model.Objective;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TodoListRepository extends MongoRepository<Objective, String> {
}
