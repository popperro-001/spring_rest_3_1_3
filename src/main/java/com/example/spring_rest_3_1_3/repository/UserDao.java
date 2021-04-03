package com.example.spring_rest_3_1_3.repository;

import com.example.spring_rest_3_1_3.entity.User;

import java.util.List;

public interface UserDao {
    List<User> userList();

    User getUserById(Long id);

    void addUser(User user);

    void removeUser(Long id);

    User getUserByUsername(String username);
}
