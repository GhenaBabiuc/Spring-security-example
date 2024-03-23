package com.example.springsecurityexample.controller;

import com.example.springsecurityexample.model.Application;
import com.example.springsecurityexample.service.AppService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/apps")
@AllArgsConstructor
public class AppController {

    private AppService appService;

    @GetMapping("/welcome")
    public String welcome() {
        return "Welcome to the page";
    }

    @GetMapping("/all-app")
    public List<Application> getAllApplication() {
        return appService.getAllApplications();
    }

    @GetMapping("/{id}")
    public Application getApplicationById(@PathVariable int id) {
        return appService.getApplicationById(id);
    }
}
