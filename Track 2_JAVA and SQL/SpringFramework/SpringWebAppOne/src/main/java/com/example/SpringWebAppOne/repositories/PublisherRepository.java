package com.example.SpringWebAppOne.repositories;

import com.example.SpringWebAppOne.domain.Publisher;
import org.springframework.data.repository.CrudRepository;

public interface PublisherRepository extends CrudRepository<Publisher,Long> {
}
