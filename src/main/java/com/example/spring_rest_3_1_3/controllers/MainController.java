package com.example.spring_rest_3_1_3.controllers;


import com.example.spring_rest_3_1_3.entity.User;
import com.example.spring_rest_3_1_3.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Repository;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.security.Principal;

@Controller
public class MainController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserDetailsService userDetailsService;

    @GetMapping("/")
    public String indexPage() {
        return "redirect:/login";
    }


    @GetMapping("/admin")
    private String userList(Model model, Principal principal){
        model.addAttribute("principal", userDetailsService.loadUserByUsername(principal.getName()));
        model.addAttribute("roles", userService.allRoles());

        return "index";
    }

    @GetMapping("/user")
    public String userService(Model model, Authentication authentication){
        User user = (User) authentication.getPrincipal();
        model.addAttribute("user", user);
        return "user";
    }
}
