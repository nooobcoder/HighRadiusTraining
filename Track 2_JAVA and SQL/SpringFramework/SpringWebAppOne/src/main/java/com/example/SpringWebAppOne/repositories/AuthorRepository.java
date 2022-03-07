package com.example.SpringWebAppOne.repositories;

import com.example.SpringWebAppOne.domain.Author;
import org.springframework.data.repository.CrudRepository;

public interface AuthorRepository extends CrudRepository<Author, Long> {
}