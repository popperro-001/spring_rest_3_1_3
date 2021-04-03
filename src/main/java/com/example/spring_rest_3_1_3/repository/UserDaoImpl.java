package com.example.spring_rest_3_1_3.repository;

import com.example.spring_rest_3_1_3.entity.Role;
import com.example.spring_rest_3_1_3.entity.User;

import org.springframework.security.core.userdetails.UsernameNotFoundException;

import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import java.util.Collections;
import java.util.List;
@Repository
public class UserDaoImpl implements UserDao{

    @PersistenceContext
    private EntityManager entityManager;



    @Override
    public List<User> userList() {
        return entityManager.createQuery("from User").getResultList();
    }

    @Override
    public User getUserById(Long id) {
        return entityManager.find(User.class, id);
    }

    @Override
    public void addUser(User user) {
        if (user.getRoles() == null){
            user.setRoles(Collections.singleton(new Role(1l, "ROLE_USER")));
        }
        entityManager.merge(user);
    }

    @Override
    public void removeUser(Long id) {
        Query query = entityManager.createQuery("delete from User U where U.id = :id");
        query.setParameter("id", id);
        query.executeUpdate();
    }

    @Override
    public User getUserByUsername(String username) {
        TypedQuery<User> user = entityManager.createQuery("from User U where U.username = :username", User.class);
        user.setParameter("username", username);
        if (user.getSingleResult() == null){
            throw new UsernameNotFoundException("User not found");
        }
        return user.getSingleResult();
    }
}
