package com.example.springpetclinic.services;

import java.util.Set;

public interface CrudService<T, ID> {
    Set<T> findAll();

    T findById(ID id);

    T save(T object); // Takes in an owner object

    void delete(T object);

    void deleteById(ID id);
}
