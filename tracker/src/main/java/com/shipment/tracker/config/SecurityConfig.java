package com.shipment.tracker.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors()
                .and()
                .csrf().disable() // Disable CSRF for WebSocket connections
                .authorizeHttpRequests()
                .requestMatchers("/truck-location/**").permitAll() // Allow public WebSocket connections
                .requestMatchers("/ws/**").permitAll() // Allow WebSocket paths
                .requestMatchers("/update-location").permitAll() // Allow location updates
                .anyRequest().authenticated() // Other endpoints require authentication
                .and()
                .httpBasic(); // Enable basic authentication

        return http.build();
    }

}
