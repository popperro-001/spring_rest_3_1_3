package com.example.spring_rest_3_1_3.service;

import com.example.spring_rest_3_1_3.entity.Role;
import com.example.spring_rest_3_1_3.entity.User;

import java.util.List;

public interface UserService {

    void addUser(User user);

    void removeUser(Long id);

    User getUserById(Long id);

    List<User> userList();

    Role getRoleByName(String name);

    List<Role> allRoles();
}
