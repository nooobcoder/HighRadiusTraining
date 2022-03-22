package com.example.springjokesapp.controllers;

import com.example.springjokesapp.services.JokeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class JokeController {

    private final JokeService jokeService;

    @Autowired // This would not be necessary if we have a single service in the Spring project
    public JokeController(JokeService jokeService) {
        this.jokeService = jokeService;
    }

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String getARandomJoke(Model model) {
        model.addAttribute("joke", jokeService.getJoke());
        return "index";
    }
}
