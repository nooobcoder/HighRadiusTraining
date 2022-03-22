package com.example.springpetclinic.services;

import com.example.springpetclinic.model.Owner;
import org.springframework.stereotype.Service;

@Service
public interface OwnerService extends CrudService<Owner, Long> {
    Owner findByLastName(String lastName);
}
