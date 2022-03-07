package com.example.SpringWebAppOne.repositories;

import com.example.SpringWebAppOne.domain.Book;
import org.springframework.data.repository.CrudRepository;

public interface BookRepository extends CrudRepository<Book, Long> {
}