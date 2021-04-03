package com.example.spring_rest_3_1_3.repository;

import com.example.spring_rest_3_1_3.entity.Role;

import java.util.List;

public interface RoleDao {
    Role getRoleByName(String name);

    List<Role> allRoles();
}
