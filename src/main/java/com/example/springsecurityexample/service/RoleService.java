package com.example.springsecurityexample.service;

import com.example.springsecurityexample.model.Role;
import com.example.springsecurityexample.repositories.RoleRepository;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

@Service
public class RoleService {

    @Resource
    private RoleRepository roleRepository;

    public Role getUserRole() {
        return roleRepository.findByName("ROLE_USER").get();
    }
}
