package com.example.springpetclinic.bootstrap;


import com.example.springpetclinic.model.Owner;
import com.example.springpetclinic.model.Vet;
import com.example.springpetclinic.services.OwnerService;
import com.example.springpetclinic.services.VetService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

    private final OwnerService ownerService;
    private final VetService vetService;

    public DataLoader(OwnerService ownerService, VetService vetService) {
        this.ownerService = ownerService;
        this.vetService = vetService;
    }

    @Override
    public void run(String... args) throws Exception {
        Owner owner = new Owner();
        owner.setId(1L);
        owner.setFirstName("Michael");
        owner.setLastName("Michael");
        ownerService.save(owner);

        owner = new Owner();
        owner.setId(2L);
        owner.setFirstName("Fiona");
        owner.setLastName("Glenanne");
        ownerService.save(owner);

        System.out.println("Loaded Owners...");

        Vet vet = new Vet();
        vet.setId(1L);
        vet.setFirstName("Sam");
        vet.setLastName("Axe");
        vetService.save(vet);

        vet = new Vet();
        vet.setId(2L);
        vet.setFirstName("Jessie");
        vet.setLastName("Porter");
        vetService.save(vet);

        System.out.println("Loaded Vets...");
    }
}
