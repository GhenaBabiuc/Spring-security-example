package com.example.springsecurityexample.service;

import com.example.springsecurityexample.model.dto.AuthDto;
import com.example.springsecurityexample.model.dto.TokenResponseDto;
import com.example.springsecurityexample.model.dto.UserRegistrationDto;
import com.example.springsecurityexample.model.dto.UserDto;
import com.example.springsecurityexample.model.exception.AppError;
import com.example.springsecurityexample.model.User;
import com.example.springsecurityexample.service.util.JwtTokenUtils;
import jakarta.annotation.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

@Service
public class AuthService {

    @Resource
    private UserService userService;

    @Resource
    private JwtTokenUtils jwtTokenUtils;

    @Resource
    private AuthenticationManager authenticationManager;

    public ResponseEntity<?> createAuthToken(@RequestBody AuthDto authDto) {

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authDto.getUsername(), authDto.getPassword()));
        } catch (BadCredentialsException e) {
            return new ResponseEntity<>(new AppError(HttpStatus.UNAUTHORIZED.value(), "Incorrect login or password"), HttpStatus.UNAUTHORIZED);
        }

        UserDetails userDetails = userService.loadUserByUsername(authDto.getUsername());
        String token = jwtTokenUtils.generateToken(userDetails);

        return ResponseEntity.ok(new TokenResponseDto(token));
    }

    public ResponseEntity<?> createNewUser(@RequestBody UserRegistrationDto userRegistrationDto) {

        if (!userRegistrationDto.getPassword().equals(userRegistrationDto.getConfirmPassword())) {
            return new ResponseEntity<>(new AppError(HttpStatus.BAD_REQUEST.value(), "The passwords don't match"), HttpStatus.BAD_REQUEST);
        }

        if (userService.findByUsername(userRegistrationDto.getUsername()).isPresent()) {
            return new ResponseEntity<>(new AppError(HttpStatus.BAD_REQUEST.value(), "A user with the specified name already exists"), HttpStatus.BAD_REQUEST);
        }

        User user = userService.createNewUser(userRegistrationDto);

        return ResponseEntity.ok(new UserDto(user.getId(), user.getUsername(), user.getEmail()));
    }
}
